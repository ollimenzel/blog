---
title: Links
links:
  - title: GitHub
    description: GitHub is the world's largest software development platform.
    website: https://github.com
    image: https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png
  - title: TypeScript
    description: TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
    website: https://www.typescriptlang.org
    image: ts-logo-128.jpg
menu:
    main: 
        weight: -50
        params:
            icon: link

comments: false
draft: true
---

To use this feature, add `links` section to frontmatter.

This page's frontmatter:

```yaml
links:
  - title: GitHub
    description: GitHub is the world's largest software development platform.
    website: https://github.com
    image: https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png
  - title: TypeScript
    description: TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
    website: https://www.typescriptlang.org
    image: ts-logo-128.jpg
```

`image` field accepts both local and external images.
{{< figure src="data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 viewBox%3D%220 0 24 24%22%3E%0A%20%20%3Ccircle cx%3D%2212%22 cy%3D%2212%22 r%3D%2210%22%20%2F%3E%0A%3C%2Fsvg%3E" alt="Donut" >}}

In Markdown, you can set the width of an image by using some HTML in your Markdown. For example, you can use the `width` attribute in an `img` tag like this: 

![Alt text](ts-logo-128.jpg)
{{ $image := $image.Resize "x400" }}

{{<imgproc ts-Logo-128.jpg Resize "200x" />}}
. This will set the width of the image to 200 pixels. You can also use a percentage value for the width attribute, such as `width="50%"`, which will set the width of the image to 50% of its parent container¹.

