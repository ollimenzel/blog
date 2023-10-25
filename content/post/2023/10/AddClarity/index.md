---
title: "How to set up Microsoft Clarity for SharePoint SiteCollections with PowerShell"
description: "In this blog post, we will explore how to use PowerShell to set up Microsoft Clarity for a SharePoint portal SiteCollection. This can be useful if you want to gain insights into how users interact with your SharePoint portal and optimize the user experience."
date: 2023-10-23T20:35:23+02:00
draft: true
author: Oliver
keywords: ["How-to", "SiteOwners", "SharePoint", "Portal", "PowerShell",]
tags: ["How-to", "SiteOwners", "SharePoint", "Clarity", "PowerShell"]
categories: ["Microsoft365","PowerShell"]
slug: AddClarity
toc: false
comments:
    host: techhub.social
    username: ollimenzel
    id: 
image: HeaderImage.png
---
## Introduction

Microsoft Clarity is a free web analytics tool that helps website owners understand how users interact with their website. Clarity provides insights into user behavior, such as heatmaps, session recordings, and funnels, which can be used to optimize the user experience and improve website performance.

## Why Use Clarity for a SharePoint Portal?

Microsoft Clarity can be a useful tool for gaining insights into how users interact with your SharePoint portal. By using Clarity, you can:

- Identify areas of your portal that are causing confusion or frustration for users.
- Optimize the user experience by making changes based on user behavior.
- Improve website performance by identifying and fixing issues that are causing users to leave your portal.

Clarity provides a range of features that can help you gain insights into user behavior, including heatmaps, session recordings, and funnels. By using these features, you can gain a deeper understanding of how users interact with your SharePoint portal and make data-driven decisions to improve the user experience.

## Prerequisites

Before we get started, there are a few prerequisites that you will need:

- A SharePoint Online site where you have permission to add custom actions.
- PowerShell 7.2 or later installed on your computer.
- The PnP PowerShell module installed on your computer.
- A Microsoft Clarity account. You can sign up for a free account at https://clarity.microsoft.com/.
Get the Product ID of the Clarity App. You will need it in the script.
{{< image src="ProjectID.png" alt="MS Clarity Project ID in Settings" width="60%" >}}

## Installing the SharePoint App
As a SharePoint Administrator, you can acquire apps from this repository:
https://handsontek.net/Downloads/clarity.zip
if you want more information about the app, you can also find an other version here:
https://github.com/joaoferreira/microsoftclarity/

1. **Log in to the SharePoint Admin Center** 
In the SharePoint Admin Center click on more features and then click on the `Apps` button.
{{< image src="SP-Apps.png" alt="SharePoint Admin Center App Center button" width="60%" >}}

1. **Upload App to the SharePoint** 
Click the upload button and choose the dowloaded app file.
{{< image src="UploadClarityApp.png" alt="Upload Clarity App" width="60%" >}} 

1. **Define the scope of the App** 
Select if you want to install the App for the whole tenant or only for specific sites.
{{< image src="SelectClarityScope.png" alt="Select Clarity App Scope" width="40%" >}}

1. **Check Apps for SharePoint**
Check the Apps for SharePoint list to see if the app was added successfully.
{{< image src="ClarityInstalled.png" alt="Clarity App in Apps for SharePoint" width="70%" >}}

1. **Add Clarity App to SiteCollection**
- Go to the SiteCollection where you want to add the Clarity App and click on the cogwheel in the top right corner. Then click on `Add an app`.
{{< image src="AddClarityApp.png" alt="Add Clarity App to SiteCollection" width="60%" >}}
- In the My apps page click on the `All` tab and then click on the `Clarity` app.
{{< image src="ClarityApp.png" alt="Clarity App in My Apps" width="60%" >}}

## The Script

The PowerShell script below demonstrates how to activate Microsoft Clarity on a SharePoint SiteCollection:

```powershell
# Connect to SharePoint Online using PnP PowerShell
Connect-PnPOnline -Url "https://yourtenant.sharepoint.com/sites/yoursite" -Interactive

# Add custom action for Microsoft Clarity
Add-PnPCustomAction -ClientSideComponentId '7f8fd1f2-9d26-4a4a-a607-bf4622d7ec11' -Name "Microsoft Clarity" -Title "Microsoft Clarity" -Location ClientSideExtension.ApplicationCustomizer -ClientSideComponentProperties: '{"clarityID":"Add your Clarity ID here"}' -Scope site

# Check if custom action was installed successfully
$CA = Get-PnPCustomAction -scope site
```

The script first connects to the SharePoint site using PnP-PowerShell and then adds a custom action for Microsoft Clarity using the Add-PnPCustomAction cmdlet. The custom action is added to the site scope and specifies the client-side component ID, name, title, location, and client-side component properties.

Finally, the script checks if the custom action was installed successfully using the Get-PnPCustomAction cmdlet.

Once you've set up Clarity on your SharePoint site, it typically takes `one to two hours` for the dashboard to be configured and start receiving user analytics data. After that, simply refresh the dashboard to view all the metrics and insights.

## Conclusion

In this blog post, we explored how to use PowerShell to set up Microsoft Clarity for a SharePoint portal. By using Clarity, you can gain insights into how users interact with your portal and optimize the user experience. 

By using PowerShell and the PnP PowerShell module, you can automate this process and save time and effort when setting up Clarity for your SharePoint portal.
