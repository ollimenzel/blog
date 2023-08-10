---
title: "Reconnecting Pages with Language Variations After Copying Them with ShareGate"
date: 2023-07-27T11:57:41+02:00
draft: false
author: Oliver
tags: ["How-to", "SiteOwners", "SharePoint"]
categories: ["Microsoft365"]
slug: reconnect_pages
toc: false
image: reconnect.png
---
When copying pages with language variations using ShareGate, you may encounter an issue where the Pages for the different languages are not properly connected to each other. This results in the variations not being displayed correctly on the site.

To fix this issue, you can use PowerShell to reconnect the pages with their language variations. In this blog post, we'll walk through the PowerShell code for doing this.

### Step-by-Step Explanation of the Code

Here's a step-by-step explanation of the PowerShell code for reconnecting pages with language variations after copying them with ShareGate:

1. First, we need to connect to the SharePoint site where the pages are located. We can do this using the `Connect-PnPOnline` cmdlet:

```powershell
Connect-PnPOnline -Url "https://contoso.sharepoint.com/sites/MySite"
```

2. Next, we need to get a list of all the pages in the site. We can do this using the `Get-PnPFolderItem` cmdlet with the right language folder:

```powershell
$Files = Get-PnPFolderItem -FolderSiteRelativeUrl SitePages/de 
```

This code gets a list of all the pages in the "Site Pages" language folder.

3. Now that we have a list of all the pages, we need to loop through each page and reconnect its language variations. We can do this using a `foreach` loop:

```powershell
foreach ($Page in $Pages) {
    # Reconnect language variations for the page
}
```

4. Inside the `foreach` loop, we need to get the default file for the page. We can do this using the `Get-PnPFile` cmdlet:

```powershell
$DefaultFile = Get-PnPFile -Url "SitePages/$($Page.Name)" -AsListItem
```

This code gets the default Page by using the `Name` property from the `$Page` object.

5. Next, we need to get additional informations from the language variations of the page. We can do this using the `Get-PnPListItem` cmdlet:

```powershell
$LangFile = Get-PnPFile -Url SitePages/$Language/$($Page.Name) -AsListItem
```

This code gets a information about language variations page by filtering the pages in the "Site Pages" library by Folder `$Language`-Variable and the `$Page.Name`.

6. Now that we have all the information we need, we can reconnect the language variations to the default file. We can do this using the `Set-PnPListItem` cmdlet:

```powershell
    #Set the Default Item field
    Set-PnPListItem -List SitePages -Identity $DefaultFile.Id -Values @{"_SPTranslatedLanguages" = $LangISO}
```

```powershell
    #Set the Language Item fields
    Set-PnPListItem -List SitePages -Identity $LangFile.Id -Values @{'_SPIsTranslation' = '1'; '_SPTranslationLanguage' = $LangISO; '_SPTranslationSourceItemId' = $DefaultFile.FieldValues.UniqueId }
```

This code sets the `_SPTranslationSourceItemId` property of the variation file to the GUID of the default file.

7. That's it! We've now looped through all the pages and their language variations, and reconnected them to each other.

### Conclusion

In this blog post, we've walked through the PowerShell code for reconnecting pages with language variations after copying them with ShareGate. By using this code, you can ensure that the language variations are properly connected to each other, and that they are displayed correctly on the site.

Here's the complete PowerShell script for reconnecting pages with language variations after copying them with ShareGate:

```powershell
$SiteCollection = "https://contoso.sharepoint.com/sites/SiteCollection"
$Language = "de"
$LangISO = "de-de"

#Create Connection
Connect-PnPOnline -Url $SiteCollection -Interactive

#Get all aspx pages within Folder DE in Library SitePages
$Pages = Get-PnPFolderItem -FolderSiteRelativeUrl SitePages/$Language

#Loop through all files and get the file object from the files with the same name in the root directory
foreach ($Page in $Pages) {
    $DefaultFile = Get-PnPFile -Url SitePages/$($Page.Name) -AsListItem
    $LangFile = Get-PnPFile -Url SitePages/$Language/$($Page.Name) -AsListItem
    #Set the Default Item field
    Set-PnPListItem -List SitePages -Identity $DefaultFile.Id -Values @{"_SPTranslatedLanguages" = $LangISO}
    #Set the German Language Item fields
    Set-PnPListItem -List SitePages -Identity $LangFile.Id -Values @{'_SPIsTranslation' = '1'; '_SPTranslationLanguage' = $LangISO; '_SPTranslationSourceItemId' = $DefaultFile.FieldValues.UniqueId }
}
```
