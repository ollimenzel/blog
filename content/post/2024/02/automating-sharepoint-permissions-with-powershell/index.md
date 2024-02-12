---
title: Change SharePoint group to Security Groups with PowerShell
description: Streamline SharePoint group with my PowerShell script guide. Efficiently manage user access and enhance security in your organization.
date: 2024-02-12T16:29:31.980Z
draft: false
author: Oliver
keywords:
    - SharePoint group
    - PowerShell
    - Security Groups
    - SharePoint permission management
    - SharePoint group migration
    - EntraID group management
    - SharePoint user permissions
tags:
    - How-to
    - PowerShell
    - Security
    - SharePoint
categories:
    - SharePoint
slug: change-sharepoint-group-security-groups-powershell
toc: false
comments:
    host: techhub.social
    username: ollimenzel
    id: ""
image: Header-Image.png
---
# Automating SharePoint Permissions with PowerShell

Managing SharePoint user permissions can be a complex and time-consuming task, especially for large organizations with numerous users and groups. Automation can significantly streamline this process, saving time and reducing the potential for errors. In this post, we'll explore a PowerShell script that automates the management of SharePoint permissions by migrating users from SharePoint groups to EntraID Security Groups.

## Why use Security groups instead of SharePoint permission groups?

Using EntraID Security Groups instead of SharePoint permission groups offers several advantages:

- Centralized Management:

    EntraID Security Groups allow for centralized management of user access across multiple services, including SharePoint. This means you can manage permissions for various applications from one place.
- Simplified Administration: 
    
    When users are added or removed from an EntraID Security Group, their access to all associated resources is automatically updated, reducing the administrative overhead of managing permissions for each resource separately.

- Improved Security: 
    
    EntraID Security Groups can be integrated with advanced security features like conditional access policies, which provide better control and security over who can access your SharePoint content.

- Audience Targeting: 
    
    EntraID and Microsoft 365 groups support audience targeting in SharePoint, which is not available with SharePoint groups. This allows for more granular control over content and resource visibility to different groups of users.

- Flexibility: 
    
    EntraID Security Groups can be used across multiple sites and can be managed by group/site owners, providing flexibility in permission management tailored to specific sites or departments.

These benefits make EntraID Security Groups a robust and efficient choice for managing permissions in a SharePoint environment.

## Understanding the PowerShell Script

The script performs the following actions:

1. Connects to a SharePoint site collection.

2. Retrieves all SharePoint Permission Groups.

3. For each group, it performs the following:
   - Gets users from the SharePoint Group.
   - Creates a new EntraID Security Group.
   - Adds all users from the SharePoint Group to the EntraID Security Group.
   - Removes all users from the SharePoint Group.
   - Adds the EntraID Security Group to the SharePoint Group.

### Script Breakdown

Here's a breakdown of the key parts of the script:

#### Connecting to SharePoint
```powershell
Connect-PnPOnline -Url "https://<YourTenantName>.sharepoint.com/sites/<YourSiteName>" -Interactive
```

#### Retrieving Groups
The script is checking if the Title of the current item does not match any of the listed patterns. 
If the Title does not contain “SiteCollection Owners”, “SiteCollection Members”, “SiteCollection Visitors”, “SharingLinks”, or “Limited Access”, then the condition will be $true and the SharePoint Group will be added to the $Groups array. 

```powershell
$Groups = Get-PnPGroup | Where-Object { $_.Title -notlike '*SiteCollection Owners*' -and $_.Title -notlike '*SiteCollection Members*' -and $_.Title -notlike '*SiteCollection Visitors*' -and $_.Title -notlike '*SharingLinks*' -and $_.Title -notlike '*Limited Access*' }
```

#### Creating a New EntraID Security Group
```powershell
$NewGroup = New-PnPAzureADGroup -DisplayName "<NewGroupName>" -MailNickname "<MailNickname>" -Description "<GroupDescription>" -IsSecurityEnabled
```

#### Adding Users to the EntraID Security Group
```powershell
foreach ($User in $Users) {
    Add-PnPAzureADGroupMember -Identity $NewGroup.Id -Users $User.UserPrincipalName
}
```

#### Removing Users from the SharePoint Group
```powershell
foreach ($User in $Users) {
    Remove-PnPGroupMember -LoginName $User.LoginName -Identity $Group.Title
}
```

#### Adding the EntraID Security Group to the SharePoint Group
```powershell
# Assuming $NewGroup contains the EntraID Security Group you created earlier
# and $Group is the current SharePoint Group you're processing

# Initialize variables for the loop
$Stoploop = $false
[int]$Retrycount = 0

do {
    try {
        # Add the EntraID Security Group to the SharePoint Group
        Add-PnPGroupMember -Group $Group.Title -LoginName $NewGroup.DisplayName
        Write-Host "EntraID Group $($NewGroup.DisplayName) added successfully to SharePoint Group $($Group.Title)"
        $Stoploop = $true
    }
    catch {
        if ($Retrycount -gt 5) {
            Write-Host "Failed to add EntraID Group $($NewGroup.DisplayName) to SharePoint Group $($Group.Title) after 5 retries."
            $Stoploop = $true
        }
        else {
            Write-Host "Retrying to add EntraID Group $($NewGroup.DisplayName) to SharePoint Group $($Group.Title) in 10 seconds..."
            Start-Sleep -Seconds 10
            $Retrycount = $Retrycount + 1
        }
    }
} While ($Stoploop -eq $false)
```

This loop will attempt to add the EntraID Security Group to the SharePoint Group. If it encounters an error, it will retry up to five times before giving up. This ensures that temporary issues such as network latency or because the newly created group isn't available yet don’t prevent the script from completing its task.

# The Complete Script
Below is the complete script without personal information. Ensure you replace the placeholders with your specific details before running it.

```powershell
# Connect to the SharePoint site using PnP-PowerShell
Connect-PnPOnline -Url "https://<YourTenantName>.sharepoint.com/sites/<YourSiteName>" -Interactive

# Get all SharePoint Permission Groups for the site collection
$Groups = Get-PnPGroup | Where-Object { $_.Title -notlike '*SiteCollection Owners*' -and $_.Title -notlike '*SiteCollection Members*' -and $_.Title -notlike '*SiteCollection Visitors*' -and $_.Title -notlike '*SharingLinks*' -and $_.Title -notlike '*Limited Access*' }

# Go through all permission groups
foreach ($Group in $Groups) {
    # Get Users from the SharePoint Group
    $Users = Get-PnPGroupMember -Identity $Group.Title
    # Create a new EntraID Security Group
    $NewGroup = New-PnPAzureADGroup -DisplayName "<NewGroupName>" -MailNickname "<MailNickname>" -Description "<GroupDescription>" -IsSecurityEnabled

    # Add all Users from the SharePoint Group to the EntraID Security Group
    foreach ($User in $Users) {
        Add-PnPAzureADGroupMember -Identity $NewGroup.Id -Users $User.UserPrincipalName
    }

    # Remove all Users from the SharePoint Group
    foreach ($User in $Users) {
        Remove-PnPGroupMember -LoginName $User.LoginName -Identity $Group.Title
    }

    # Add the EntraID Security Group to the SharePoint Group
    # ... (rest of the loop and error handling)
}

Disconnect-PnPOnline
```

Conclusion
This PowerShell script is a powerful tool for SharePoint administrators looking to automate the management of user permissions. By leveraging EntraID Security Groups, it provides a more centralized and manageable approach to permission management. As always, test any scripts in a development environment before deploying them in production.

Happy scripting!
