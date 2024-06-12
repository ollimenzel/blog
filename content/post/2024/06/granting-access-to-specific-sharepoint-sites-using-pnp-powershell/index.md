---
title: Granting Access to Specific SharePoints with PnP-PowerShell
description: Learn how to grant application access to specific SharePoint sites using PnP-PowerShell for enhanced security and compliance in your development projects.
date: 2024-06-09T15:46:10.889Z
draft: true
author: Oliver
keywords:
  - SharePoint
  - PnP-PowerShell
  - Permissions
  - Security
  - Compliance
  - EntraID
  - Development
tags:
  - Microsoft365
  - PnP
  - SharePoint
  - PowerShell
categories:
  - PowerShell
slug: granting-access-specific-sharepoints-pnp-powershell
toc: false
comments:
  host: techhub.social
  username: ollimenzel
  id: ""
image: header-image.jpeg
replyto: ""
type: default
---

Managing access permissions effectively is essential for data security and compliance. When working with SharePoint Online in your development projects, there are situations where you need to grant application access to specific sites without giving broad permissions across your entire tenant. 
This targeted approach minimizes potential security risks by adhering to the principle of least privilege.

### Why Targeted Access is Important

Providing access only to necessary sites enhances security and compliance by:
1. **Reducing Risk Exposure**: Limiting access to essential sites prevents unauthorized access to sensitive data.
2. **Improving Compliance**: Helps meet regulatory requirements by ensuring that only relevant personnel or applications can access specific data.
3. **Simplifying Management**: Makes it easier to audit and manage permissions.

### Creating an Application Registration in Entra ID

Before you can use a PowerShell script to manage site permissions, you need to create an application registration in Entra ID (formerly Azure AD). Here's how you can do it:

1. **Sign in to the Microsoft Entra admin center**.
2. Navigate to **Applications**.
3. Select **App registrations** and then **New registration**.
{{< image src="SCR-20240612-rudw.png" alt="Creating a new app registration in Entra ID" width="40%" >}}
4. Enter a name for your application.
5. Select the supported account types (usually **Accounts in this organizational directory only**).
6. Redirect URI can be left blank or set if needed.
7. Click **Register**.
{{< image src="SCR-20240612-ruvo.png" alt="Registering the application in Entra ID" width="30%" >}}
8. Once registered, note the **Application (client) ID**.
{{< image src="SCR-20240612-rvlf.png" alt="Application (client) ID in Entra ID" width="30%">}}
9. Under **Certificates & secrets**, create a new client secret or upload a certificate. Note the secret value or thumbprint.
{{< image src="SCR-20240612-rvlf.png" alt="Creating a new client secret in Entra ID" width="30%" >}}
10. Under **API permissions**, add permissions required for SharePoint access (e.g., **Sites.Selected**).
{{< image src="SCR-20240612-rwbm.png" alt="Adding API permissions in Entra ID" width="30%" >}}

### The PowerShell Script Explained

Now, let's break down the provided PowerShell script and explain its components in simple terms.

#### Setting Up Variables

```powershell
# Set the name of the tenant
$TenantName = 'your-tenant-name'

# Get the AppID and Thumbprint from the specified location
$ClientId = 'your-AppID'
$Thumbprint = 'your-Thumbprint'
```

- **$TenantName**: Replace `'your-tenant-name'` with the actual name of your Microsoft 365 tenant.
- **$ClientId** and **$Thumbprint**: Replace `'AppID'` and `'your-Thumbprint'` with the appropriate path to retrieve your App ID and Thumbprint.

#### Connecting to SharePoint

```powershell
# Set the name of the tenant with the .onmicrosoft.com suffix
$tenant = 'your-tenant-name.onmicrosoft.com'

# Set the URL of the site collection to grant permissions to
$Site = 'https://your-tenant-name.sharepoint.com/sites/your-site-name'

# Connect to the SharePoint site using PnP-PowerShell
Connect-PnPOnline -Url "$Site" -Interactive
```

- **$tenant**: Replace `'your-tenant-name.onmicrosoft.com'` with your tenant's domain.
- **$Site**: Replace `'https://your-tenant-name.sharepoint.com/sites/your-site-name'` with the URL of your SharePoint site.
- **Connect-PnPOnline**: This command connects to the specified SharePoint site using your credentials.

#### Managing Site Permissions

```powershell
# Check if the Azure AD app already exists
$App = Get-PnPAzureADAppSitePermission

# Grant the specified Azure AD app site permissions to the site collection
Grant-PnPAzureADAppSitePermission -AppId 'your-app-id' -DisplayName 'your-display-name' -Permissions Write

# Revoke the specified Azure AD app site permissions from the site collection
Revoke-PnPAzureADAppSitePermission -PermissionId 'your-permission-id' -Force
```

- **Get-PnPAzureADAppSitePermission**: Checks existing site permissions for the Azure AD app.
- **Grant-PnPAzureADAppSitePermission**: Grants the specified permissions to the Azure AD app. Replace `'your-app-id'` and `'your-display-name'` with your app's ID and display name.
- **Revoke-PnPAzureADAppSitePermission**: Revokes permissions from the Azure AD app. Replace `'your-permission-id'` with the ID of the permission you want to revoke.

### The Complete Script

Here's the cleaned-up version of the script, without any specific data:

```powershell
# Set the name of the tenant
$TenantName = 'your-tenant-name'

# Get the AppID and Thumbprint from the specified location
$ClientId = op read 'op://your-path/AppID'
$Thumbprint = op read 'op://your-path/Thumbprint'

# Set the name of the tenant with the .onmicrosoft.com suffix
$tenant = 'your-tenant-name.onmicrosoft.com'

# Set the URL of the site collection to grant permissions to
$Site = 'https://your-tenant-name.sharepoint.com/sites/your-site-name'

# Connect to the SharePoint site using PnP-PowerShell
Connect-PnPOnline -Url "$Site" -Interactive -ClientId $ClientId -Thumbprint $Thumbprint -Tenant $tenant

# Check if the Azure AD app already exists
$App = Get-PnPAzureADAppSitePermission

# Grant the specified Azure AD app site permissions to the site collection
Grant-PnPAzureADAppSitePermission -AppId 'your-app-id' -DisplayName 'your-display-name' -Permissions Write

# Revoke the specified Azure AD app site permissions from the site collection
Revoke-PnPAzureADAppSitePermission -PermissionId 'your-permission-id' -Force
```

Using scripts like this helps ensure that only necessary permissions are granted, enhancing security and compliance in your SharePoint environment. This practice helps maintain a secure and compliant environment within your organization.
Did you already use this approach to grant access to specific SharePoint sites? Share your experience in the comments below!