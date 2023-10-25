---
title: "Simplify List Creation in SharePoint using PowerAutomate and Graph API"
description: "Today, I'll share an invaluable trick that will significantly simplify the process of creating lists in SharePoint using Power Automate. The best part? You can achieve it with just one action! Let's dive right in!"
date: 2023-07-05T10:55:26+02:00
draft: true
author: Oliver
keywords: ["How-to", "SiteOwners", "SharePoint", "PowerAutomate","GraphAPI"]
tags: ["How-to", "SiteOwners", "SharePoint"]
categories: ["Microsoft365","PowerPlatform"]
slug: Disable_sharing
toc: false
image: Microsoft365-Logo.png
---
## Streamlining List Creation with the Graph API and SharePoint REST API

To accomplish this, we'll leverage the power of the Graph API and the SharePoint REST API, which are closely related. By utilizing the "Send an HTTP request to SharePoint" action in Power Automate, we can authenticate as an end user and make calls to the Graph API.

## The Power of Automation

 With the Graph API, you gain the ability to define columns, specify their data types, and set additional parameters. For instance, you can define multiple choice options or customize the display of a date and time field. This level of flexibility comes in handy when building lists for different purposes, such as production, testing, and development.

## Benefits of Automating List Creation

By leveraging the API in Power Automate instead of manually creating lists through the SharePoint user interface (UI), you save valuable time and effort. Automating the process allows for quick and consistent list creation. 

## Demo: Creating a List in SharePoint with Power Automate

In the demo, we start by navigating to a SharePoint site that currently lacks lists. Through Power Automate, we execute a flow that creates a list for us. By putting the flow in test mode, we witness the magic unfold within seconds—a brand new list appears on our SharePoint site!

We refresh the page to see the newly created list both in the site navigation and the site contents. Clicking on the list, we can explore the columns and their respective data types that we defined. It's all there—Boolean, date time, hyperlinks, numbers (including calculated fields), text, and even a choice column with predefined options!

## Under the Hood: Understanding the Process

Curious about the inner workings? Let me break it down for you. We'll be using the Graph Explorer, which allows us to authenticate through the SharePoint connector. By providing a URL with the site ID and appropriate verbs, we can retrieve the lists on the site.

Once we have the list information, we create a new list by sending a POST request with a body that defines the list's properties. You can specify the display name, description, and the desired columns. Extending the body's array of columns allows for adding as many as needed.

## Taking It Further

If you want to explore additional options and configurations for data types, [Microsoft Docs](https://docs.microsoft.com/sharepoint/) provides comprehensive documentation. You can delve into defining choice columns, setting default formatting for date and time fields, and more. It's a valuable resource to have by your side.

## Implementing the Solution in Power Automate

To put it all together in Power Automate, we utilize a series of actions. Firstly, we retrieve the ID of the SharePoint site using the "Send an HTTP request to SharePoint" action. Then, we create the list by sending a POST request with the necessary parameters. Additionally, we include a link to the list on the SharePoint site for easy access.

## Bonus Tip: Creating List Items

As an added bonus, we demonstrate how to create an item in the newly created list. While this approach might not be the most efficient for creating

 extensive lists, it serves as an introduction to further possibilities. You can expand on this concept and incorporate it into your own workflows as needed.

## Conclusion

In conclusion, leveraging the Graph API and SharePoint REST API in Power Automate enables you to simplify list creation in SharePoint. The ability to define columns, set data types, and customize list properties provides flexibility and consistency. With just a few actions, you can effortlessly create lists, saving precious time and effort.
