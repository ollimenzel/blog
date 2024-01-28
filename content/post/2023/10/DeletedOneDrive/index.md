---
title: "Find / Restore Deleted OneDrive Sites with PnP PowerShell"
description: "In this blog post, learn how to restore a deleted OneDrive site in SharePoint Online using PowerShell."
date: 2023-10-27T15:22:18+02:00
draft: false
author: Oliver
keywords: ["How-to", "SiteOwners", "OneDrive", "PowerShell", "PnP"]
tags: ["How-to", "SiteOwners", "OneDrive", "PowerShell", "PnP"]
categories: ["Microsoft365","PowerShell"]
slug: Deleted_OneDrive
toc: false
comments:
    host: techhub.social
    username: ollimenzel
    id: 111308008693991990
image: header.png
---
## Introduction

In SharePoint Online, users can store their files in OneDrive for Business, which is a personal document library that is associated with their user account. Sometimes, users may accidentally delete their OneDrive site or get deleted when they leave the company, which can result in the loss of important files and data. 

Fortunately, SharePoint Online administrators can restore deleted OneDrive sites using PowerShell and the PnP PowerShell module. In this blog post, we will discuss how to use the PowerShell script "Get-deleted-OneDrives.ps1" to restore a deleted OneDrive site.

## Prerequisites

Before we begin, you will need to have the following:

- A SharePoint Online tenant administrator account
- PowerShell 7.2 or later installed on your computer
- The PnP PowerShell module installed on your computer

## Script Overview

The "Get-deleted-OneDrives.ps1" script is a PowerShell script that uses the PnP PowerShell module to restore a deleted OneDrive site. Here's an overview of what the script does:

1. Connects to SharePoint Online using the `Connect-PnPOnline` cmdlet.
2. Retrieves a list of all deleted OneDrive sites using the `Get-PnPTenantDeletedSite` cmdlet.
3. Filters the list of deleted OneDrive sites to find the site that matches the specified user name using the `Where-Object` cmdlet.
4. Restores the deleted OneDrive site using the `Restore-PnPTenantSite` cmdlet.
5. Checks if the site was successfully restored using the `Get-PnPTenantSite` cmdlet.
6. Disconnects from SharePoint Online using the `Disconnect-PnPOnline` cmdlet.

Let's take a closer look at each step of the script.

## Step 1: Connect to SharePoint Online

The first step of the script is to connect to SharePoint Online using the `Connect-PnPOnline` cmdlet. This cmdlet requires the URL of your SharePoint Online site and your credentials. 

In the script, the URL of the SharePoint Online admin center is used as the site URL. The `-interactive` parameter is used to prompt the user for their credentials.

```powershell
Connect-PnPOnline -Url "https://yourtenant-admin.sharepoint.com" -interactive
```

## Step 2: Retrieve a List of Deleted OneDrive Sites

The second step of the script is to retrieve a list of all deleted OneDrive sites using the `Get-PnPTenantDeletedSite` cmdlet. This cmdlet retrieves a list of all deleted sites in the SharePoint Online tenant, including OneDrive sites.

In the script, the `-IncludeOnlyPersonalSite` parameter is used to retrieve only deleted OneDrive sites.

```powershell
$DeletedOneDrives = Get-PnPTenantDeletedSite -IncludeOnlyPersonalSite
```

## Step 3: Filter the List of Deleted OneDrive Sites

The third step of the script is to filter the list of deleted OneDrive sites to find the site that matches the specified user name using the `Where-Object` cmdlet. 

In the script, the `Where-Object` cmdlet is used to filter the `$DeletedOneDrives` array to find the OneDrive site that contains the specified user name in its URL. The `-like` operator is used to perform a `case-insensitive` match on the `Url` property of each object in the array.

```powershell
$FoundOneDrive = $DeletedOneDrives | Where-Object { $_.Url -like '*oliver_menzel*' }
```

## Step 4: Restore the Deleted OneDrive Site

The fourth step of the script is to restore the deleted OneDrive site using the `Restore-PnPTenantSite` cmdlet. This cmdlet requires the URL of the deleted site and the `-Force` parameter to confirm the restoration.

In the script, the URL of the OneDrive site that was found in step 3 is used as the URL parameter for the `Restore-PnPTenantSite` cmdlet.

```powershell
Restore-PnPTenantSite -Url $FoundOneDrive.Url -Force
```

## Step 5: Check if the Site was Restored

The fifth step of the script is to check if the OneDrive site was successfully restored using the `Get-PnPTenantSite` cmdlet. This cmdlet requires the URL of the site that was restored.

In the script, the URL of the OneDrive site that was found in step 3 is used as the URL parameter for the `Get-PnPTenantSite` cmdlet.

```powershell
Get-PnPTenantSite -Url $FoundOneDrive.Url
```

## Step 6: Disconnect from SharePoint Online

The final step of the script is to disconnect from SharePoint Online using the `Disconnect-PnPOnline` cmdlet.

```powershell
Disconnect-PnPOnline
```

## The whole script looks like this:

```powershell
# Connect to SharePoint Online using PnP PowerShell
Connect-PnPOnline -Url "https://yourtenant-admin.sharepoint.com" -interactive

# Get-PnPDeletedSite
$DeletedOneDrives = Get-PnPTenantDeletedSite -IncludeOnlyPersonalSite

#Find deleted OneDrive by user name in url
$FoundOneDrive = $DeletedOneDrives | Where-Object { $_.Url -like '*oliver_menzel*' }

#Restore deleted OneDrive
Restore-PnPTenantSite -Url $FoundOneDrive.Url -Force

#Check if Site was restored
Get-PnPTenantSite -Url $FoundOneDrive.Url
Disconnect-PnPOnline
```

## Conclusion

In this blog post, we discussed how to use a PowerShell script to restore a deleted OneDrive site in SharePoint Online. We covered the prerequisites for running the script, the overview of the script, and the details of each step of the script. 

By using this script, SharePoint Online administrators can quickly and easily restore deleted OneDrive sites and prevent the loss of important files and data.