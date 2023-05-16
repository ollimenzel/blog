---
title: "Simplifying File Management with OneDrive: Add to OneDrive vs. Team Site Sync"
date: 2023-05-16T16:38:45+02:00
draft: true
author: Oliver
tags: ["How-to", "OneDrive", "SharePoint"]
categories: ["Microsoft365"]
slug: Add_to_OneDrive
toc: false
image: Main.png
---
**Simplifying File Management with OneDrive: Add to OneDrive vs. Team Site Sync**

OneDrive offers convenient file management and collaboration features, including Add to OneDrive and Team Site Sync. These tools streamline access to shared files and folders, enhancing productivity. Let's explore their benefits and compare them.

## Add to OneDrive: Easy File Access

Add to OneDrive lets you bring shared files into your personal OneDrive space without moving them physically. Simply locate the desired folder, select the Folders tile, and choose "Add Shortcut to My Files." This creates a shortcut for quick access.

![Add shortcut to OneDrive](Add2OneDrive.png)

This feature is particularly useful for accessing files across devices related to collaborative projects. It provides centralized access regardless of your location, improving efficiency and reducing clicks.

## Team Site Sync: Comprehensive File Synchronization

Team Site Sync also allows you syncing files from OneDrive, SharePoint, and Teams.

Team Site Sync syncs specific folders or libraries, but it is limited to the device where synchronization occurred. 

## Choosing Between Add to OneDrive and Team Site Sync

For most scenarios, Add to OneDrive is recommended due to its enhanced capabilities and future development. If your organization isn't extensively using Team Site Sync, it's advisable to prioritize Add to OneDrive exclusively.

If your organization currently employs both features, Microsoft plans to provide guidance on migrating from Team Site Sync to Add to OneDrive gradually.

## Disabling the Sync Button

To streamline the file synchronization experience and promote Add to OneDrive, you can disable the sync button for the entire site using the following code:

```powershell
Set-SPOTenant -HideSyncButtonOnTeamSite $true
```

This script helps IT administrators guide users towards Add to OneDrive and encourages its adoption.
