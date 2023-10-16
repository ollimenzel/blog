---
title: "Restoring Files from the Recycle Bin in SharePoint using PnP PowerShell"
date: 2023-10-15T22:52:41+02:00
draft: false
author: Oliver
keywords: ["How-to", "SiteOwners", "SharePoint"]
tags: ["How-to", "SiteOwners", "SharePoint", "PowerShell", "PnP", "RecycleBin"]
categories: ["Microsoft365","PowerShell"]
slug: RestoreRecycleBin
toc: false
comments:
    host: techhub.social
    username: ollimenzel
    id: 
image: RecycleBin.jpeg
---
PnP PowerShell is a powerful tool that allows you to interact with SharePoint and perform various operations, including restoring files from the recycle bin. In this blog post, we will explore how to use PnP PowerShell to restore files from the recycle bin, filter by path or folder, and filter by timespan.

## Basic Commands

Here are some of the basic cmdlets you can use:

1. `Get-PNPRecycleBinItem`: This cmdlet retrieves all items in the recycle bin.
2. `Restore-PnPRecycleBinItem`: This cmdlet restores the specified item from the recycle bin to its original location.

Here is an example of how you can use these cmdlets:

```powershell
# Get a specific recycle bin item
$item = Get-PNPRecycleBinItem -Identity <ID>

# Restore the item
Restore-PnPRecycleBinItem -Identity $item -Force
```

In this example, replace `<ID>` with the ID of the recycle bin item you want to restore.

## Filtering by Path or Folder

You can filter the items in the recycle bin based on their directory name or title. Here is an example:

```powershell
Get-PnPRecycleBinItem | ForEach-Object {
    $dir = $_.DirName
    $title = $_.Title
    $path = "$dir/$title"
    $fileExists = Get-PnPFile -url $path -ErrorAction SilentlyContinue
    if (!$fileExists) {
        $_ | Restore-PnpRecycleBinItem -Force -ErrorAction SilentlyContinue
    }
}
```

In this example, `Get-PnPRecycleBinItem` retrieves all items in the recycle bin. The `ForEach-Object` cmdlet iterates over each item. If a file with the same path does not already exist, the script restores the item.

## Filtering by Timespan

You can also filter items based on their deletion date. Here is an example:

```powershell
$restoreDate = (Get-Date).AddDays(-30)
Get-PnPRecycleBinItem | Where-Object { $_.DeletedDate -gt $restoreDate } | Restore-PnpRecycleBinItem -Force
```

In this example, `Get-Date` gets the current date and time, and `AddDays(-30)` subtracts 30 days from it. The `Where-Object` cmdlet filters out items that were deleted more than 30 days ago. The script then restores the remaining items.

## Restoring Files Deleted in Last 3 Hours from a Specific Folder

Here's an example of how you can restore files that were deleted in the last 3 hours and were located in a certain folder:

```powershell
$restoreDate = (Get-Date).AddHours(-3)
$folderPath = "<YourFolderPath>"
Get-PnPRecycleBinItem | Where-Object { $_.DeletedDate -gt $restoreDate -and $_.DirName -eq $folderPath } | Restore-PnpRecycleBinItem -Force
```

In this example, replace `<YourFolderPath>` with your specific folder path.
with something like this: `$folderPath = "/sites/YourSiteName/Shared Documents/YourFolderName"`


Please note that you need to be connected to your SharePoint site using `Connect-PnPOnline` before running these commands.

## Conclusion

PnP PowerShell provides a powerful way to manage your SharePoint site, including restoring files from the recycle bin. By understanding how to use these cmdlets and how to filter by path or folder and timespan, you can effectively manage your SharePoint site's content.

Remember to always test your scripts in a safe environment before running them on your live site to avoid any unintended consequences.

Happy coding! 🚀

References:
: [PnP PowerShell Overview](https://docs.microsoft.com/en-us/powershell/module/sharepoint-pnp/get-pnprecyclebinitem?view=sharepoint-ps)
: [SharePoint Online: How to Restore Items from Recycle Bin using PowerShell?](https://www.sharepointdiary.com/2016/08/sharepoint-online-how-to-restore-items-from-recycle-bin-using-powershell.html)
: [Restore-PnPRecycleBinItem](https://docs.microsoft.com/en-us/powershell/module/sharepoint-pnp/restore-pnprecyclebinitem?view=sharepoint-ps)
: [Connect-PnPOnline](https://docs.microsoft.com/en-us/powershell/module/sharepoint-pnp/connect-pnponline?view=sharepoint-ps)
: [How to restore items from Recycle Bin in SharePoint Online using PnP PowerShell](https://www.c-sharpcorner.com/article/how-to-restore-items-from-recycle-bin-in-sharepoint-online-using-pnp-powersh/)
