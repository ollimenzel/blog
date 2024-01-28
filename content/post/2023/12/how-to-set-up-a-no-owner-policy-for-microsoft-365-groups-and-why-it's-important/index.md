---
title: "M365 Groups: Set Up a 'No Owner Policy' & why it's Important"
description: In this blog post, I will show you how-to set up a 'No Owner Policy' for Microsoft 365 Groups and why it's important.
date: 2023-12-19T10:00:38.286Z
draft: false
author: Oliver
keywords:
    - Microsoft 365
    - Microsoft 365 Groups
    - No Owner Policy
    - How-to
tags:
    - How-to
    - Microsoft 365
    - Microsoft 365 Groups
    - Policy
categories:
    - Governance
    - Microsoft365
slug: set-owner-policy-microsoft-365-groups-important
toc: false
comments:
    host: techhub.social
    username: ollimenzel
    id: "111608846241824215"
image: image-2.png
---
## Introduction
Managing group ownership is crucial for maintaining order and security within an organization in Microsoft 365. A "No Owner Policy" in Microsoft 365 Groups prompts members to assume ownership when the original owner leaves, ensuring continuity and accountability. This blog post explores setting up this policy, its importance, and the different settings options.

## The Importance of a No Owner Policy
### Ensuring Group Continuity
When a group's owner leaves, it can disrupt the group's direction and leadership. The No Owner Policy addresses this by asking members to take ownership, ensuring the group remains active and well-managed.

### Facilitating Other Policies
This policy is instrumental in supporting other group management policies. For example, the Inactive Group Policy or [Guest Access Review Policy](https://www.menzel.it/post/2023/11/external-user-access-reviews-office-365-ensuring-secure-collaboration/) require an active owner for key decisions. Without this, such policies will not work correctly, leading to unmanaged groups or security risks.

## How-to Set Up a No Owner Policy
### Access Microsoft 365 Admin Center
- **Login**: Sign in to the [Microsoft 365 Admin Center](https://admin.microsoft.com/) using an administrator account.

### Navigate to Groups
- **Find Groups Section**: In the Admin Center, locate the 'Settings' section. This is typically found in the navigation pane.
### Implementing the Policy
- **Locate Group Policies**: Within the Settings section, go to 'Microsoft 365 Groups'.
- **Enabling No Owner Policy**: Look for an option that triggers a notification for group members to volunteer for ownership when the current owner leaves. Enable this setting.
{{< image src="SCR-20231219-layz.png" alt="M365 Group Settings" width="50%">}}

### Configuring Notifications
You can configure the following settings by clicking on the 'Configure' link:
- **Specify who can receive ownership notifications**: Choose whether all members or only selected members can receive notifications.
{{< image src="image.png" alt="Dropdown Ownership notification" width="50%">}}

- **Number of active members to notify**: Set the number of members to notify. Only up to 90 active members, who aren't guests, can be notified
per group.
- **Notify most active members**: Set for how long these notifications are sent. 
Consider the urgency and how best to prompt a response without causing notification fatigue.
- **Select a sender**: Choose who the notification is sent from. This can be the group email or a specific user.
- **Customize Notification Messages**: Edit the default message to clearly explain why the member is receiving this notification and the importance of taking ownership.
{{< image src="SCR-20231219-leig.png" alt="Customize Notification Messages" width="60%">}}
- **Select which groups to target**: Choose which groups to target with this policy. You can select all groups or specific groups.
{{< image src="SCR-20231219-lerz.png" alt="Select which groups to target" width="50%">}}
### Save and Test
- **Review and finish**: Review the settings and click 'Save' to implement the policy.
- **Test the Policy**: It's a good practice to test the policy with a few groups to ensure it works as expected and members receive notifications.

## Conclusion
Setting up a No Owner Policy in Microsoft 365 Groups is a proactive step towards ensuring seamless group management and security. By following this how-to, organizations can effectively implement this policy to maintain continuous and responsible group management.

---

If you have any questions or feedback, please leave a comment below or reach out to me on social media.