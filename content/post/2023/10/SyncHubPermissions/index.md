---
title: "How to Sync Hub Permissions to Associated Sites in SharePoint Online"
date: 2023-10-08T11:23:54+02:00
draft: false
author: Oliver
keywords: ["How-to", "SiteOwners", "SharePoint"]
tags: ["How-to", "SiteOwners", "SharePoint"]
categories: ["Microsoft365"]
slug: Hub_Sync_Permissions
toc: false
image: image-3.png
comments:
  host: techhub.social
  username: ollimenzel
  id: 111200796795675287
---
If you are using SharePoint Online, you may have created a hub site to organize your related sites and provide a consistent look and feel. A hub site consists of a main hub site and several associated sites that are connected to the hub. Each site has its own security and permissions, which means that users who have access to the hub site may not have access to the associated sites, and vice versa.

However, in some scenarios, you may want to sync the permissions of the hub site to the associated sites, so that users who have access to the hub site can also have access to the associated sites. For example, if you have a hub site for an Intranet and several associated sites for different teams, you may want everyone in the company to have at least read access to all the sites within the hub.

Fortunately, SharePoint Online has a feature called Hub Sync Permissions that allows you to do this easily. In this blog post, I will show you how to enable this feature and what it does.

## How to Enable Hub Sync Permissions

To enable Hub Sync Permissions, you need to do two steps:

1. Enable the feature at the hub site level.
2. Enable the feature at each associated site.

### Step 1: Enable the feature at the hub site level

To enable the feature at the hub site level, you need to:

- Navigate to the main hub site.
- Click on **Site permissions** from the gear icon menu.
- Click on the **Hub** Tab.
- Turn on the toggle for **Sync hub permissions to associated sites**.
{{< image src="image.png" alt="Hub permissions" width="40%" >}}
- Select a security group that will serve as the hub visitors. This group will be added to all the associated sites as visitors. You can use any existing security group or create a new one.

### Step 2: Enable the feature at each associated site

To enable the feature at each associated site, you need to:

- Navigate to each associated site that you want to sync permissions with.
- Click on **Site permissions** from the gear icon menu.
- Click on the **Hub** Tab.
- Turn on the toggle for **Sync hub permissions to this site**.
{{< image src="image-1.png" alt="Connector name" width="40%" >}}

## What Hub Sync Permissions Does

When you enable Hub Sync Permissions, it does two things:

- It adds the hub visitors group that you selected at the hub site level to each associated site as visitors. This means that users who are in this group will have read access to all the sites within the hub.
- It creates a new security group called **Hub Visitors** at each associated site. This group contains all the Visitors of the hub site. This means that users who are Visitors of the hub site will also be Visitors of all the associated sites.
{{< image src="image-2.png" alt="Connector name" width="60%" >}}

## How to Disable Hub Sync Permissions

If you want to disable Hub Sync Permissions, you can do so by:

- Turning off the toggle for **Sync hub permissions to this site** at each associated site level.
- Turning off the toggle for **Sync hub permissions to associated sites** at the hub site level.

 **Note** that disabling Hub Sync Permissions will not remove the existing permissions that were added by this feature. You will need to manually remove them if you want to.

## Conclusion

Hub Sync Permissions is a useful feature that allows you to sync the permissions of your hub site and your associated sites in SharePoint Online. It can help you simplify your permission management and ensure consistent access across your related sites. However, you should also be aware of its implications and limitations before using it.

I hope this blog post was helpful for you. If you have any questions or feedback, please contact me at one of the social networks. 
Thank you for reading!
