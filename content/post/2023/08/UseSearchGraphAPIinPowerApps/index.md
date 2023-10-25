---
title: "Using Graph API Calls to the Search Endpoint in PowerApps with Office365Groups.HttpRequest"
description: "PowerApps is a powerful tool that allows you to create custom business applications without the need for coding. One of the ways you can enhance your PowerApps is by using Graph API calls to the search endpoint 'https://graph.microsoft.com/v1.0/search/query'. In this blog post, we'll show you how to do this using the Office365Groups.HttpRequest and the preview feature 'ParseJSON function and untyped objects'."
date: 2023-08-10T16:31:08+02:00
draft: false
author: Oliver
tags: ["How-to", "PowerApps", "Search", "GraphAPI"]
categories: ["PowerPlatform"]
slug: PowerAppsSearchGraphAPI
toc: false
comments:
    host: techhub.social
    username: ollimenzel
    id: 110866713489176612
image: Article-Image.png
---
## Pre-requisites

1. Before we get started, you'll need to activate the preview feature "ParseJSON function and untyped objects" in your PowerApps settings. To do this, go to the Settings menu, browse to Upcoming features, and turn on the setting called ParseJSON function and untyped objects. If this feature is not turned on, the ParseJSON function will not be found in the formula bar.
2. You need to add the Office365Groups connector to your PowerApps. To do this, go to the Data menu, and select Office 365 Groups. This will add the connector to your PowerApps.

{{< figure src="./Office365-Connector.png" alt="Adding Office365 Connector" width="30%" class="my-float-left" >}}

## Using Office365Groups.HttpRequest

The Office365Groups.HttpRequest allows you to make HTTP requests to external services from within your PowerApps. This can be useful when you want to retrieve data from an external source, such as the Graph API.

Here's an example of how you might use Office365Groups.HttpRequest to search for a message by its subject:

```
Set(varRequestBody,"{""requests"": [{""entityTypes"": [""message""], ""query"": {""queryString"": ""subject:Hello""}}]}");
```

The code above sets a variable named `varRequestBody`. The JSON object contains a single property named requests .The object in the array represent the search request and contains two properties: entityTypes and query. The entityTypes property a string that specifies the type of entity to search for. In this case, the entity type specified is message (Email's). The query property is an object that contains a single property named queryString. The queryString property is a string that specifies the search query to execute. In this case, the search query is `subject:Hello`.

```
Set(varFile,
    "data:text/plain;base64," & With({
    InputText:varRequestBody,
    AsciiTable:AddColumns(Sequence(2^8,1),"char",Char(Value)),
    B64ToBin:
    Table(
        {b64:"A",bin:"000000"},
        {b64:"B",bin:"000001"},
        {b64:"C",bin:"000010"},
        {b64:"D",bin:"000011"},
        {b64:"E",bin:"000100"},
        {b64:"F",bin:"000101"},
        {b64:"G",bin:"000110"},
        {b64:"H",bin:"000111"},
        {b64:"I",bin:"001000"},
        {b64:"J",bin:"001001"},
        {b64:"K",bin:"001010"},
        {b64:"L",bin:"001011"},
        {b64:"M",bin:"001100"},
        {b64:"N",bin:"001101"},
        {b64:"O",bin:"001110"},
        {b64:"P",bin:"001111"},
        {b64:"Q",bin:"010000"},
        {b64:"R",bin:"010001"},
        {b64:"S",bin:"010010"},
        {b64:"T",bin:"010011"},
        {b64:"U",bin:"010100"},
        {b64:"V",bin:"010101"},
        {b64:"W",bin:"010110"},
        {b64:"X",bin:"010111"},
        {b64:"Y",bin:"011000"},
        {b64:"Z",bin:"011001"},
        {b64:"a",bin:"011010"},
        {b64:"b",bin:"011011"},
        {b64:"c",bin:"011100"},
        {b64:"d",bin:"011101"},
        {b64:"e",bin:"011110"},
        {b64:"f",bin:"011111"},
        {b64:"g",bin:"100000"},
        {b64:"h",bin:"100001"},
        {b64:"i",bin:"100010"},
        {b64:"j",bin:"100011"},
        {b64:"k",bin:"100100"},
        {b64:"l",bin:"100101"},
        {b64:"m",bin:"100110"},
        {b64:"n",bin:"100111"},
        {b64:"o",bin:"101000"},
        {b64:"p",bin:"101001"},
        {b64:"q",bin:"101010"},
        {b64:"r",bin:"101011"},
        {b64:"s",bin:"101100"},
        {b64:"t",bin:"101101"},
        {b64:"u",bin:"101110"},
        {b64:"v",bin:"101111"},
        {b64:"w",bin:"110000"},
        {b64:"x",bin:"110001"},
        {b64:"y",bin:"110010"},
        {b64:"z",bin:"110011"},
        {b64:"0",bin:"110100"},
        {b64:"1",bin:"110101"},
        {b64:"2",bin:"110110"},
        {b64:"3",bin:"110111"},
        {b64:"4",bin:"111000"},
        {b64:"5",bin:"111001"},
        {b64:"6",bin:"111010"},
        {b64:"7",bin:"111011"},
        {b64:"8",bin:"111100"},
        {b64:"9",bin:"111101"},
        {b64:"+",bin:"111110"},
        {b64:"/",bin:"111111"}
    )},
    With({
    BinRep:
    Concat(
        AddColumns(ForAll(Split(InputText,""), {Result: ThisRecord.Value}),"dec",LookUp(AsciiTable,char=Result).Value),//Convert text to Ascii character code (decimal)
        Concat(Sequence(8,8,-1),Text(If(And(Mod(dec,Power(2,Value))>=Power(2,Value-1),Mod(dec,Power(2,Value))<Power(2,Value)),1,0)))&"","")//Convert decimal to binary
    },
        With({b64string:Concat(
            Sequence(
                RoundUp(Len(BinRep)/6,0),0),
                LookUp(
                    B64ToBin,
                    bin=Mid(BinRep&Left("000000",6-Mod(Len(BinRep),6)),6*Value+1,6) //Left("000000"....) is padding right with zero
                ).b64&"", 
                ""
            )},
            b64string&Left("====",Mod(4-Mod(Len(b64string),4),4))//Convert binary to base64
        )
    )
));
```
This nice trick I learned from Hiro's Blog - Encode plain text to Base64 - https://mofumofupower.hatenablog.com/entry/encode_decode 
The `varRequestBody` variable is then used to generate a Base64-encoded string that represents the request body for an HTTP request. This is done by first converting the varRequestBody variable to binary format, then to Base64 format. The resulting Base64 string is then used as the request body for the HTTP request.

```
Set(
    varResult,
    Office365Groups.HttpRequest(
        "https://graph.microsoft.com/v1.0/search/query",
        "POST",
        varFile
    )
)
```
The HTTP request is sent to the Microsoft Graph API's search endpoint (`https://graph.microsoft.com/v1.0/search/query`) using the `Office365Groups.HttpRequest` function. The function takes three arguments: the URL of the endpoint, the HTTP method to use (in this case, `POST`), and the request body to send with the request.
This whole code can for example be put in a buttons OnSelect property to send the request when the button is clicked.

{{< figure src="SearchBehindButton.png" alt="Button control with OnSelect code" class="my-float-left" >}}


## Showing the Results in a Gallery

Once we've made our HTTP request and retrieved the result, we can use a gallery to display the results. To do this, we'll need to insert a gallery control to our App and set the `Items` property of the gallery to the following. To be able to work with those results, we need to get the resonse body from the HTTP request. This is done by doing one of the following:

- Make the same call in the Graph Explorer and exam the response body from there
    {{< figure src="Graph-Explorer.png" alt="Picture of the Graph Explorer" width="60%" class="my-float-left" >}}
- In PowerApps start the App - Monitor to get the response body from there
    {{< figure src="Monitor.png" alt="Advanced Tools with PowerApp Monitor" width="30%" class="my-float-left" >}}

```
Table(Index(Table(Index(Table(varResult.value),1).Value.hitsContainers),1).Value.hits)
```

The `varResult` variable is containing the response from the API. The response is expected to be a JSON object that contains a property named `value`. The `value` property is an array of objects that represent the search results. 

The code uses the `Table` function to convert the `varResult.value` array to a table. The resulting table has a single column named `Column1` that contains the search results. The `Index` function is then used to extract the first element of the `Column1` array, which is another table. This table represents the `hitsContainers` property of the search results. 

The `Index` function is used again to extract the first element of the `hitsContainers` table, which is another table. This table represents the `hits` property of the search results. Finally, the `Table` function is used again to convert the `hits` table to a table that can be displayed in the output pane of Visual Studio Code.

Next, we'll need to add a label control to the gallery and set its `Text` property to the following:

```
ThisItem.Value.resource.subject
```

In a gallery, each item is represented by a record that contains one or more fields. The `ThisItem` function is used to reference the current item in the gallery. 

If we look at the output of the `Table` function, we can see that each item in the gallery is represented by a record that contains a `resource` field. The `resource` field is an object that contains a `subject` field.

Therefore, `ThisItem.Value.resource.subject` is used to extract the subject of the resource from the current search result and display it in the label control.

## Conclusion

In this blog post, I've shown you how to use Graph API calls to Microsoft Search in PowerApps by using the Office365Groups.HttpRequest and the preview feature "ParseJSON function and untyped objects". By following these steps, you'll be able to retrieve data from external sources and use it within your PowerApps. We hope you found this post helpful! Let me know if you have any questions or comments.

## Additional Resources
1. Some links to more information about Microsoft Search and the Graph API:
    - Microsoft Graph Explorer - https://developer.microsoft.com/en-us/graph/graph-explorer
    - Microsoft Graph API documentation - https://learn.microsoft.com/en-us/graph/search-concept-overview

2. For testing / creating search queries:
    - SharePoint Search Query Tool - https://github.com/pnp/PnP-Tools (Windows only)
    - SP-Editor - Search Microsoft Edge Add-ons for it in the future as the Search part isn't yet implemented in the meantime get the old Add-on from the Chrome Web Store (Windows, Mac, Linux) 
