---
title: "Create a Custom Connector for Azure OpenAI"
date: 2023-10-04T08:59:32+02:00
draft: true
author: Oliver
keywords: ["How-to", "SiteOwners", "SharePoint"]
tags: ["How-to", "SiteOwners", "SharePoint"]
categories: ["Microsoft365","PowerPlatform"]
slug: Disable_sharing
toc: false
image: Microsoft365-Logo.png
---
Today I want to share with you a new feature that I've been testing out: a custom connector for AzureOpenAI. This connector allows you to access the powerful natural language processing capabilities of OpenAI from Azure Logic Apps, Power Automate, and Power Apps.

In this post, I'll show you how to set up and test the connector, and give you some tips on how to use it effectively.

First, you need to get access to the AzureOpenAI beta. This is a limited preview, so you need to fill out this form and wait for an invitation email. Once you get the email, you can activate your subscription and get your API key.

Next, you need to create the custom connector in Azure. Go to the Azure portal and navigate to the Custom Connectors section. Click on "Create custom connector" and choose "Import an OpenAPI file". Then, upload this file that contains the OpenAPI definition of the AzureOpenAI connector. Give your connector a name and a description, and click "Continue".

Now, you need to configure the security settings of the connector. Go to the "Security" tab and choose "API Key" as the authentication type. Enter your API key in the "Parameter value" field, and click "Continue".

Finally, you need to test the connector. Go to the "Test" tab and choose an operation to test. For example, you can test the "Complete" operation, which generates text completions based on a prompt. Enter a prompt in the "query" field, and click "Test operation". You should see a response with a list of possible completions.

You can also test the connector from Power Apps. To do that, you need to create a new app or open an existing one. Then, go to the "Data" tab and click on "Add data". Choose your custom connector from the list and click "Connect". Now, you can use the connector's actions in your app logic.

For example, you can create a simple app that generates blog post titles based on a topic. To do that, you need to add a text input control for the topic, a button to trigger the generation, and a gallery control to display the results. Then, set the button's OnSelect property to:

ClearCollect(Results,AzureOpenAI.Complete({query:TextInput1.Text & " blog post",engine:"davinci",max_tokens:10,top_p:1}))

This will call the Complete operation of the connector with the text input as the query, and store the results in a collection called Results. Then, set the gallery's Items property to:

Results.choices

This will display the choices returned by the connector in the gallery. You can also customize the gallery's layout and appearance as you like.

That's it! You have created a custom connector for AzureOpenAI and tested it from Power Apps. I hope you find this feature useful and fun. Please let me know if you have any feedback or questions in the comments below.

Thanks for reading!