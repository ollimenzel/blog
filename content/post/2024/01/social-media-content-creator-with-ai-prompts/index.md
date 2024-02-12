---
title: Social media content creator with AI Promts
description: How to use an AI Promt to create content for your social media accounts with AI. To post them I will use the Flows from a previous blog post.
date: 2024-01-28T09:57:41.109Z
draft: false
author: Oliver
keywords:
    - AI Prompt
    - Power Automate
    - Power Platform
    - Flow
tags:
    - How-to
    - Power Automate
    - Power Platform
    - AI Promts
categories: []
slug: social-media-content-creator-ai-prompts
toc: false
comments:
    host: techhub.social
    username: ollimenzel
    id: "111835402481462176| Where-Object { $_.Title -notcontains 'SharingLinks' }"
image: "Header-Picture.jpeg"
---
## Prerequisites
For this tutorial you need the following:
- A premium Power Automate account, e.g. a Power Automate per user plan or an Powerapps Comunity Plan
- A Social Media Account, e.g. Twitter, Mastodon, LinkedIn, etc.
- The Flows from one of my previous posts [Power Automate - How-to Posting on BlueSky and Mastodon]({{< relref "../../../2023/11/powerautomatesocialposts/index.md" >}})

## Create AI Prompt in Power Platform
1. Go to [Power Automate](https://flow.microsoft.com)
1. Click on **AI hub** in the left navigation
    {{< image src="image.png" alt="Power Automate Navigation" width="30%">}}
1. Choose **AI Prompts**
    {{< image src="image-1.png" alt="AI capabilities overview" width="70%">}}
1. Click on **Create text using custom prompt**
    {{< image src="image-2.png" alt="Overview Models" width="70%">}}
1. Choose **Custom task with custom prompts** and click on **Create custom prompt**
    {{< image src="SCR-20231221-ohvw.png" alt="Custom Promts" width="60%">}}
1. Enter a name for your AI Prompt 
1. Enter your prompt (here is what I used for my prompt)

    >As an expert in social media, create me witty posts for my social networks 
    (Bluesky and Mastodon) with meaningful hashtags (Microsoft centric) about my newest Blog post 
    that you can find here: [Dynamic Value BlogURL] . 
    Also please take the lowest character count into consideration for the two networks. 
    Also create another post for LinkedIn that can be a bit longer. 
    Please create the posts in a way that will make my followers want to know more about the blog post 
    e.g. with examples or some insides. 
    Please also don't add any BlogURL. 
    Please just response the post without any explanations. but in the following format: 
    { "ShortPost" : Post text for BlueSky and Mastodon,
    "LinkedInHeading" : Headline for LinkedIn Post,
    "LinkedInPost" : Post text for LinkedIn
    }

## Create the Flow in Power Automate
{{< image src="image-3.png" alt="Flow Overview" width="90%">}}
This is the Flow I created for writing post on social media. I will explain the steps in the following sections.
1. "Manually trigger a flow" (this is the trigger)
    Of course you could also use another trigger like schedule post from a calendar .
1. "Get Item" from SharePoint Online.
    This step gets the URL of the newest blog post from my SharePoint Blog list.
    {{< image src="image-4.png" alt="Get Item - Settings page" width="60%">}}
1. "AIBuilder Predict Custom Prompt" from Common Data Service for Apps.
    This step uses the AI Prompt we created in the previous section to create the post text for the social media networks.
    {{< image src="image-5.png" alt="AIBuilder Predict Custom Prompt - Settings page" width="60%">}}
1. "Start and Wait for a Text Suggestion Approval" from Approvals.
    This step waits for the approval of the post text. I use this step to check the post text before it is posted on social media. 
    If you don't want to check the post text before it is posted on social media you can skip this step and go directly to the next step.
    {{< image src="image-6.png" alt="Start and Wait for a Text Suggestion Approval - Settings page" width="60%">}}
1. "Parse JSON".
    This step parses the JSON from the previous step and creates the variables for the post text.
    Copy the JSON from the AI Builder step and paste it into the "Schema" field.
    {{< image src="image-7.png" alt="Parse JSON - Settings page" width="60%">}}
1. "Condition".
    This step checks if we approved the AI generated post text or not. If we approved the post text it will go to the next step. If we didn't approve the post text it will go to the "Condition - No" step which will lead to the end of the Flow.
    {{< image src="image-8.png" alt="Condition - Settings page" width="60%">}} 
1. "Apply to each".
    This step will create a post for each social media network that we put in the Column in the SharPoint list. With the "switch" step we are running the "Run a Child Flow" step to create the post for each needed social media network.
    {{< image src="image-9.png" alt="Schema of looping throught differnet social post posts" width="80%">}}
As you can see this is a very simple Flow. But it will save you a lot of time and you can be sure that your post text is correct.
Now let's see how you will use this Flow to create your social media posts. Please leave a comment if you have any questions or suggestions. Also please share your use cases for this Flow.