---
title: "External User Access Reviews in Office 365: Ensuring Secure Collaboration"
description: "In today’s interconnected world, collaboration beyond the walls of your organization is not just a convenience; it's a necessity. However, with this necessity comes the significant responsibility of managing external user access. Office 365 (O365) offers a comprehensive suite of tools that enable collaboration while helping to ensure that access is secure, appropriate, and compliant with company policies. Access reviews are a critical component of this management. Here’s how to set up and conduct external user access reviews in O365."
date: 2023-11-09T14:02:31+01:00
draft: true
author: Oliver
keywords: ["Office 365", "External User Access", "Access Reviews", "Secure Collaboration", "Compliance Management", "Least Privilege Principle", "Microsoft 365 Compliance Center", "Azure Active Directory", "Access Review Dashboard", "Guest User Management", "Review Settings", "Permission Auditing", "Vendor Access Control", "SharePoint Site Management", "Microsoft Teams Security", "Access Approval Workflow", "Recurring Review Process", "Access Revocation", "Security Hygiene", "Audit Documentation"]
tags: ["How-to", "SiteOwners", "SharePoint"]
categories: ["Microsoft365","SharePoint"]
slug: AccessReviews
toc: false
comments:
    host: techhub.social
    username: ollimenzel
    id: 
image: Microsoft365-Logo.png
---
{{< image src="image-2.png" alt="Connector name" width="40%" >}}

**Understanding External User Access**

Before diving into the reviews, it's important to understand what external access entails. External users in O365 are individuals who are not employees, contractors, or onsite agents for your organization. They could be partners, vendors, or consultants who need access to certain parts of your O365 environment, such as SharePoint sites or Microsoft Teams.

**The Need for Access Reviews**

The principle of least privilege mandates that users should have access only to the information and resources that are absolutely necessary for their work. Over time, access requirements can change, and periodic reviews ensure that external users only have the access they need. This is where O365's access review feature comes into play, allowing for the systematic verification and auditing of user privileges.

**Setting Up Access Reviews**

To set up access reviews in O365, follow these steps:

1. **Navigate to the Access Reviews Dashboard**: Access this via the Microsoft 365 compliance center or Azure Active Directory (Azure AD) portal.
   
2. **Create a New Access Review**: Specify the scope of the review, whether it's targeted at guest users across all Microsoft Teams and Groups or specific ones.

3. **Define Review Settings**: Choose who will perform the review (group owners, specific users, or application owners), set the frequency (one-time or recurring), and establish the start and end dates.

4. **Customize Review Settings**: Decide on the outcomes for denied access, such as automatic removal or a manual step, and whether reviewers receive reminders.

5. **Review and Confirm**: Double-check the settings, and then create the access review.

**Conducting the Review**

Once set up, designated reviewers will be notified to examine the access rights of external users. Reviewers can approve or deny access for each user, and they can provide reasons for their decisions. It's best practice to include guidelines for making these decisions to ensure consistency and compliance.

**Examples of Access Reviews in Action**

- **Vendor Access Review**: A company conducts quarterly reviews of vendor access to its internal procurement system to validate that only current vendors have access.
  
- **Consultant Project Completion**: Upon the completion of a project, the external consultant’s access to the project’s SharePoint site is reviewed and revoked if no longer needed.

- **Partner Collaboration**: Annual reviews of a partner organization’s access to shared Teams channels are performed to ensure that only relevant individuals retain access.

**After the Review**

Post-review, it's crucial to act on the decisions made. If access is denied, the user's permissions should be revoked promptly. If access is to be maintained, it may be worth revisiting the level of access to ensure it aligns with the principle of least privilege.

**Best Practices**

- **Regular Schedule**: Conduct access reviews on a regular schedule to maintain security hygiene.
  
- **Clear Documentation**: Keep detailed records of each review for auditing purposes.

- **User Notification**: Inform external users about the review process to ensure transparency and avoid confusion if access is altered or revoked.

**Conclusion**

Access reviews in O365 are an essential practice for maintaining secure and efficient collaborations with external users. By regularly reviewing and adjusting access rights, organizations can protect sensitive information while facilitating productive partnerships. With O365’s robust access review tools, you can ensure that your external collaborations are both productive and secure.