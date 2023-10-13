---
title: "How to use PowerShell to change the publish date of a news page in SharePoint Online"
date: 2023-10-13T08:22:49+02:00
draft: false
author: Oliver
keywords: ["How-to", "SiteOwners", "SharePoint"]
tags: ["How-to", "SiteOwners", "SharePoint"]
categories: ["Microsoft365"]
slug: ChangePublishDate
toc: false
comments:
    host: techhub.social
    username: ollimenzel
    id: 
image: ChangePublishDate.jpeg
---

## Introduction

In this blog post, we will explore how to use PowerShell to change the first publish date of a news page in SharePoint Online. This can be useful if you need to update the publish date of a news page to reflect changes in the content or to correct errors in the original publish date.

## Prerequisites

Before we get started, there are a few prerequisites that you will need:

- A SharePoint Online site where you have permission to create and edit news pages.
- PowerShell 7.2 or later installed on your computer.
- The PnP.PowerShell module installed on your computer.

## The Script

The PowerShell script below demonstrates how to change the first publish date of a news page in SharePoint Online:

```powershell
# Set the new publish date
$publishDate = '2023-10-12'

# Set the ID of the news item to update
$newsItemId = 361

# Connect to the SharePoint site using PnP-PowerShell
Connect-PnPOnline "https://yourtenant.sharepoint.com/sites/yoursite" -ClientId $AppID -Interactive

# Get the news item in English
$englishNewsItem = Get-PnPListItem -List 'SitePages' -Id $newsItemId

# Update the news item with the new publish date
Set-PnPListItem -List 'SitePages' -Identity $newsItemId -Values @{'FirstPublishedDate' = $publishDate } -UpdateType SystemUpdate

# Check if the news item has any translations
if ($englishNewsItem.FieldValues._SPTranslatedLanguages) {
    # If there are translations, get the UniqueId of the English news item
    $uniqueId = $englishNewsItem.FieldValues.UniqueId
    # Get the translated news items
    $translatedNewsItems = Get-PnPListItem -List 'SitePages' -Query "<View Scope='RecursiveAll'><Query><Where><Contains><FieldRef Name='_SPTranslationSourceItemId'/><Value Type='Guid'>$($uniqueId)</Value></Contains></Where></Query></View>"
    # Update each translated news item
    foreach ($translatedNewsItem in $translatedNewsItems) {
        Set-PnPListItem -List 'SitePages' -Identity $translatedNewsItem.Id -Values @{'FirstPublishedDate' = $publishDate } -UpdateType SystemUpdate
    }
}
```

The script starts by setting the new publish date and the ID of the news item to update. You will need to modify these values to match your specific scenario.

Next, the script connects to the SharePoint site using PnP-PowerShell and retrieves the news item in English. The script then updates the news item with the new publish date using the Set-PnPListItem cmdlet.

The script then checks if the news item has any translations. If there are translations, the script retrieves the UniqueId of the English news item and uses it to get the translated news items. The script then updates each translated news item with the new publish date using the Set-PnPListItem cmdlet.

## Conclusion

In this blog post, we explored how to use PowerShell to change the first publish date of a news page in SharePoint Online. This can be a useful tool for updating the publish date of a news page to reflect changes in the content or to correct errors in the original publish date. 

By using PowerShell and the PnP PowerShell module, you can automate this process and save time and effort when managing your SharePoint Online news pages.