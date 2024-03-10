---
title: Finding doublettes in SharePoint list with PnP PowerShell
description: Finding doublettes in a SharePoint list using PnP PowerShell and remove them.
date: 2024-03-10T10:59:06.961Z
draft: false
author: Oliver
keywords:
  - PnP
  - PowerShell
  - SharePoint
  - SharePoint list
  - User Management
  - Doublettes 
  - Remove
  - Sharing is caring
tags:
  - PnP
  - PowerShell
  - SharePoint
  - How-to
categories:
  - SharePoint
slug: finding-doublettes-sharepoint-list-pnp-powershell
toc: false
comments:
  host: techhub.social
  username: ollimenzel
  id: ""
image: "Header-Image.jpeg"
replyto: "https://www.menzel.it/post/2024finding-doublettes-sharepoint-list-pnp-powershell"
type: default
---
In this blog post, I will break down a PnP PowerShell script that is designed to connect to a SharePoint site, retrieve a list of users from a specific SharePoint list (doublettes), identify duplicate users based on a unique identifier field, and then remove these duplicates. Of course you can use this script to remove any other kind of duplicate as well.
Let's dive into the details.

### Step 1: Metadata Retrieval

Set the tenant name and site name for the SharePoint site. The tenant name is typically the domain of the organization, the site name is the specific site within the SharePoint environment that the script will interact with. The SharePoint list name is the name of the list within the site that contains the user data.

```powershell
$tenant = 'yourtenant'
$SiteName = 'YourSiteName'
$ListName = 'YourListName'
```

### Step 2: Connecting to SharePoint

The script then connects to the SharePoint site using the PnP (Patterns and Practices) PnP PowerShell library, which is a set of PowerShell commands for SharePoint that allows for simpler scripting.

```powershell
Connect-PnPOnline -Url "https://$($tenant).sharepoint.com/sites/$SiteName" -interactive
```

### Step 3: Retrieving User List

Once connected, the script retrieves a list of all users from a specific list in SharePoint. It specifies the fields to retrieve and sets a page size of 5000, which is the maximum number of items that can be returned in a single request.

```powershell
$users = (Get-PnPListItem -List $ListName -Fields 'ID', 'UniqueID', 'userPrincipalName', 'EMail', 'Created' -PageSize 5000).FieldValues
```

### Step 4: Grouping and Sorting Users

The script then groups the users by 'UniqueID' and sorts them by the 'Created' date. It also filters out any users with a null 'UniqueID' or a 'userPrincipalName' that contains a specific domain.

```powershell
$users = $users | ForEach-Object { [PSCustomObject]@{ ID = $_.ID; UniqueID = $_.UniqueID; userPrincipalName = $_.userPrincipalName; EMail = $_.EMail; Created = $_.Created } }
$groupedItems = $users | Where-Object { $_.UniqueID -ne $null -and $_.userPrincipalName -notcontains "@specificdomain.com"} | Group-Object -Property UniqueID
```

### Step 5: Identifying Duplicates

The script identifies duplicate users (users with the same 'UniqueID') and stores them in an array. It skips the first user in each group of doublettes, meaning it will keep the oldest user (based on the 'Created' date) and mark the rest as duplicates.

```powershell
$duplicates = $groupedItems | Where-Object { $_.Count -gt 1 } | ForEach-Object { $_.Group | Sort-Object Created | Select-Object -Skip 1 } | Sort-Object UniqueID, Created -Descending
```

### Step 6: Deleting Duplicates

Finally, the script loops through the array of duplicate users and deletes them from the specific list in batches. This is done using the 'Remove-PnPListItem' command, which removes a list item from a specified list.

```powershell
$RemoveUsers = New-PnPBatch
foreach ($duplicate in $duplicates) {
    Write-Host "Deleting user with UniqueID $($duplicate.UniqueID) and userPrincipalName $($duplicate.userPrincipalName)"
    Remove-PnPListItem -List 'YourListName' -Identity $duplicate.ID -Batch $RemoveUsers
}
Invoke-PnPBatch -Batch $RemoveUsers
```

And that's it! This script provides a handy way to manage users in a SharePoint site, specifically by removing duplicate users based on their 'UniqueID'. It's a great example of how PowerShell with the help of PnP PowerShell can be used to automate administrative tasks in SharePoint.

### Full Script for Reference

Here's the full script for your reference:

```powershell
#Metadata:
$tenant = 'yourtenant'
$SiteName = 'YourSiteName'
$ListName = 'YourListName'

#Connect to the SharePoint site using PnP-PowerShell
Connect-PnPOnline -Url "https://$($tenant).sharepoint.com/sites/$SiteName" -interactive

#Get the list of all users
$users = (Get-PnPListItem -List $ListName -Fields 'ID', 'UniqueID', 'userPrincipalName', 'EMail', 'Created' -PageSize 5000).FieldValues

# Group items by UniqueID and sort by Created date
#Convert the array to a list of objects
$users = $users | ForEach-Object { [PSCustomObject]@{ ID = $_.ID; UniqueID = $_.UniqueID; userPrincipalName = $_.userPrincipalName; EMail = $_.EMail; Created = $_.Created } }
$groupedItems = $users | Where-Object { $_.UniqueID -ne $null -and $_.userPrincipalName -notcontains "@specificdomain.com"} | Group-Object -Property UniqueID

#Create an array to store the duplicate users
$duplicates = @()

# Find duplicates and skip the first item of each group
$duplicates = $groupedItems | Where-Object { $_.Count -gt 1 } | ForEach-Object { $_.Group | Sort-Object Created | Select-Object -Skip 1 } | Sort-Object UniqueID, Created -Descending

# Loop through the duplicate users and delete them in batches
$RemoveUsers = New-PnPBatch
foreach ($duplicate in $duplicates) {
    Write-Host "Deleting user with UniqueID $($duplicate.UniqueID) and userPrincipalName $($duplicate.userPrincipalName)"
    Remove-PnPListItem -List 'YourListName' -Identity $duplicate.ID -Batch $RemoveUsers
}
Invoke-PnPBatch -Batch $RemoveUsers
```
