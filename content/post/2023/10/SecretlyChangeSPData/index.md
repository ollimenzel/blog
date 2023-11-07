---
title: "Update SharePoint Metadata Silently with PnP PowerShell"
description: "Master SharePoint updates with PnP PowerShell—no history rewrites. Discover how to maintain metadata integrity effortlessly. Perfect for admins and IT pros!"
date: 2023-11-06T15:58:22+01:00
draft: false
author: Oliver
keywords: ["How-to", "SiteOwners", "SharePoint", "Microsoft365", "PowerShell", "PnP", "Update SharePoint Metadata", "PnP PowerShell Metadata", "SystemUpdate SharePoint", "SharePoint Data Integrity"]
tags: ["How-to", "SiteOwners", "SharePoint", "Microsoft365", "PowerShell", "PnP", "Metadata"]
categories: ["Microsoft365","PowerShell"]
slug: update-sharepoint-metadata-pnp-powershell
toc: false
comments:
    host: techhub.social
    username: ollimenzel
    id: 
image: SP-Metadata.png
---
## Why Bother with Metadata?

Think of metadata as the DNA of your SharePoint content. It tells you who created a document, when it was last touched, and more. This information isn’t just for kicks; it's vital for audits, compliance, and knowing the lineage of your content.

## Keeping Metadata Intact with Updates

Sometimes you need to tweak a document's details but want to keep the original "Modified By" data. PnP PowerShell is your ally here:

```powershell
# Connect to your SharePoint site
Connect-PnPOnline -Url https://contoso.sharepoint.com/sites/demo -Interactive

# Preserve metadata with a SystemUpdate
Set-PnPListItem -List "Tasks" -Identity $item -Values @{"Title"="New Project Title"} -UpdateType SystemUpdate
```
## Understanding Update Types in PnP PowerShell
When you're updating SharePoint items with PnP PowerShell, you have three update methods at your disposal, each serving a different purpose. Let's demystify these:
1. **Update**
    
    This is the standard update command. When you use Update, SharePoint treats the action as if you manually updated the item through the UI. This means:
    
    The "Modified" and "Modified By" fields will be updated to reflect the time of the update and the user who made the change.
    If versioning is enabled on the list or library, a new version will be created.
    Use it when you want to make a straightforward update that logs your changes as a new version.
1. **SystemUpdate**
    
    SystemUpdate is more discreet:

    It updates items without changing the "Modified By" and "Modified" fields.
    A new version is created if versioning is enabled, but it will not show as a new "modified" entry.
    This method is perfect when you need to make changes that don't affect the item's version history as seen by end-users, like during system migrations or bulk updates.
1. **UpdateOverwriteVersion**
    
    The UpdateOverwriteVersion is the stealth operator:

    It updates the item while keeping the "Modified By" and "Modified" fields as they were.
    It does not create a new version; instead, it overwrites the current version, even if versioning is enabled.
    This approach is suitable when you want to make a correction to the current version of an item or document without increasing the version count, effectively keeping the update under the radar.

## Changing Creator and Creation Dates: Is It Even Possible?

Yes, it is! You might need to backdate a document or correct the creator's details during migrations or cleanup:

```powershell
# Fetch the item you need to update
$item = Get-PnPListItem -List "Documents" -Id 42

# Change the "Created By" and "Created" fields
$creationDate = Get-Date "2020-01-14"
Set-PnPListItem -List "Documents" -Identity $item -Values @{
    "Author" = $newCreatorUserId;
    "Created" = $creationDate
} -SystemUpdate
```

## Data Integrity Best Practices

When you're making changes to your SharePoint content, it's essential to follow best practices to avoid data loss or corruption. Here are some tips to keep in mind:

- **Keep a Log**: Track changes for accountability.
- **Get Approval**: Make sure changes are above board and approved.
- **Test Changes**: Test your changes in a non-production environment before applying them to your live content.

## Wrapping Up

Whether you're nudging metadata back to its original state or updating it to reflect new truths, PnP PowerShell offers the flexibility and power needed for the task. It’s about making changes without losing the story of your data.

## Further Reading
PnP PowerShell Cmdlet Documentation: https://pnp.github.io/powershell/cmdlets/Set-PnPListItem.html