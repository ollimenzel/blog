---
title: External User Access Reviews in Office 365
description: In today’s interconnected world, collaboration beyond the walls of your organization is not just a convenience; it's a necessity. However, with this necessity comes the significant responsibility of managing external user access. Office 365 (O365) offers a comprehensive suite of tools that enable collaboration while helping to ensure that access is secure, appropriate, and compliant with company policies. Access reviews are a critical component of this management. Here’s how to set up and conduct external user access reviews in O365.
date: 2023-11-12T20:19:16.212Z
draft: false
author: Oliver
keywords:
    - Office 365
    - Access Reviews
    - Secure Collaboration
    - Least Privilege Principle
    - Microsoft 365 Compliance Center
    - Azure Active Directory
    - Guest User Management
    - Review Settings
    - Permission Auditing
    - Vendor Access Control
    - SharePoint Site Management
    - Access Approval Workflow
    - Recurring Review Process
tags:
    - How-to
    - SiteOwners
    - SharePoint
categories:
    - Microsoft365
    - SharePoint
slug: external-user-access-reviews-office-365-ensuring-secure-collaboration
toc: false
comments:
    host: techhub.social
    username: ollimenzel
    id: 111399485846369139
image: HeaderImage.png
---

**Understanding External User Access**

Before diving into the reviews, it's important to understand what external access entails. External users in O365 are individuals who are not employees, or onsite agents for your organization. They could be partners, vendors, or consultants who need access to certain parts of your O365 environment, such as SharePoint sites or Microsoft Teams.

**The Need for Access Reviews**

The principle of least privilege mandates that users should have access only to the information and resources that are absolutely necessary for their work. Over time, access requirements can change, and periodic reviews ensure that external users only have the access they need. This is where O365's access review feature comes into play, allowing for the systematic verification and auditing of user privileges.

**Setting Up Access Reviews**

To set up access reviews in O365, follow these steps:

1. **Navigate to the Access Reviews Dashboard**: Access this via the Microsoft 365 compliance center or Azure Active Directory (EntraID) portal.
{{< image src="image.png" alt="Access Review" width="50%">}}
   
2. **Create a New Access Review**: Specify the scope of the review, whether it's targeted at guest users across all Microsoft Teams and Groups or specific ones.
{{< image src="image-1.png" alt="Scope of Review" width="50%">}}
{{< image src="image-2.png" alt="Targeted Guest Users" width="50%" >}}

3. **Define Review Settings**: Choose who will perform the review (group owners, specific users, or application owners), set the frequency (one-time or recurring), and establish the start and end dates.
{{< image src="image-3.png" alt="Review Settings" width="50%" >}}
{{< image src="image-4.png" alt="Frequency and Dates" width="50%" >}}

4. **Customize Review Settings**: Decide on the outcomes for denied access, such as automatic removal or a manual step, and whether reviewers receive reminders.
{{< image src="image-5.png" alt="Customize Review Settings" width="50%">}}

5. **Review and Confirm**: Double-check the settings, and then create the access review.
{{< image src="image-6.png" alt="Review and Confirm" width="50%">}}

**Conducting the Review**

Once set up, designated reviewers will be notified to examine the access rights of external users. Reviewers can approve or deny access for each user, and they can provide reasons for their decisions. It's best practice to include guidelines for making these decisions to ensure consistency and compliance.

**Examples of Access Reviews in Action**

- **Vendor Access Review**: A company conducts quarterly reviews of vendor access to its internal procurement system to validate that only current vendors have access.
  
- **Consultant Project Completion**: Upon the completion of a project, the external consultant’s access to the project’s SharePoint site is reviewed and revoked if no longer needed.

- **Partner Collaboration**: Annual reviews of a partner organization’s access to shared Teams channels are performed to ensure that only relevant individuals retain access.

**Best Practices**

- **Regular Schedule**: Conduct access reviews on a regular schedule to maintain security hygiene.
  
- **Clear Documentation**: Keep detailed records of each review for auditing purposes.

- **User Notification**: Inform external users about the review process to ensure transparency and avoid confusion if access is altered or revoked.

**Conclusion**

Access reviews in O365 are an essential practice for maintaining secure and efficient collaborations with external users. By regularly reviewing and adjusting access rights, organizations can protect sensitive information while facilitating productive partnerships. With O365’s robust access review tools, you can ensure that your external collaborations are both productive and secure.