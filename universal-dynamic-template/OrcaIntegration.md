# Integration of JSON templates into Orca

## Section 1 - Directory structure

```bash
root
├── CreativeTemplates
│   └── exampleGroup.json
├── FrameTemplates
│   └── 300x250
│       ├── 300x250-1.json
│       ├── 300x250-2.json
│       ├── 300x250-3.json
│       ├── 300x250-4.json
│       ├── 300x250-5.json
│       └── 300x250-6.json
├── GlobalTemplates
│   └── 300x250.json
└── ThumbnailImages
    └── 300x250
        ├── 300x250-1.svg
        ├── 300x250-2.svg
        ├── 300x250-3.svg
        ├── 300x250-4.svg
        ├── 300x250-5.svg
        └── 300x250-6.svg
```

  - 4 directories:
    > CreativeTemplates, FrameTemplates, GlobalTemplates, ThumbnailImages
  - CreativeTemplates has one folder per template grouping, each file contains configuration for every size, see `section 2` for more information

  - GlobalTemplates contains a single file per size, see `section 3` for more information

  - FrameTemplates contains subdirectories per size of creative and each size directory, it contains the individual frames for that size, see `section 4` for more information

  - ThumbnailImages contains subdirectories per size of creative and each size directory, it contains the individual thumbnails for that size matching the corresponding frame's name, see `section 5` for more information

---

## Section 2 - Configuration files

```json
[{
  "name": "exampleGroup-300x250",
  "size": "300x250",
  "width": 300,
  "height": 250,
  "frameLimit": 5,
  "start": [
    1,
    2
  ],
  "middle": [
    2,
    3,
    4
  ],
  "end": [
    5,
    6
  ],
  "baseSize": 30000
}]
```

The configuration file informs the platform what frames can be used with which templates, where the frames can be used, the frame limit and the base size of the assets in the advert. Frames can be used in any combination for start, middle and end frames. The baseSize is representative of the KB weight.

---

## Section 3 - Global Files

```json
{
  "template": [
    {
      "t": "j",
      "s": ""
    },
    {
      "t": "s",
      "s": ""
    },
    {
      "t": "e",
      "c": "logo",
      "s": "background-image:url(logo.jpg);",
      "h": ""
    }
  ],
  "config": []
}
```

The global files are included once at the start of each creative. In here you want to put in the global styles and script and any elements that operate independantley of the animation. It is an object that contains two arrays, the template and the config. The template includes the normal json structure and the config adds in the hooks so that the platform knows what values are editable and the options that are available. See `Section 4` for more information.

---

## Section 4 - Frame Files

```json
{
  "template": [
    {
      "t": "f",
      "d": 4000,
      "s": "",
      "e": [
        {
          "t": "e",
          "s": "position:absolute;width:300px;height:250px;left:0;top:0;background-size:cover;background-position:center;background-repeat:no-repeat;background-image:url($BackgroundImage);"
        },
        {
          "t": "e",
          "h": "$CopyText",
          "s": "color:$CopyColour;font-size:$CopySize;"
        }
      ],
      "a": {
        "b": "opacity:1;",
        "n": "opacity 1s ease",
        "a": "opacity:0;"
      }
    }
  ],
  "config": [
    {
      "target": "$CopyText",
      "name": "Copy Text",
      "type": "text",
      "groupName": "copy",
      "groupType": "text",
      "initialValue": "Body Copy",
      "properties": {
        "value": "Body Copy"
      }
    }, {
      "target": "$CopySize",
      "name": "Copy Size",
      "type": "number",
      "groupName": "copy",
      "groupType": "number",
      "initialValue": 12,
      "properties": {
        "min": 12,
        "max": 14,
        "step": 2,
        "value": 12
      }
    }, {
      "target": "$CopyColour",
      "name": "Copy Colour",
      "type": "radio",
      "groupName": "copy",
      "groupType": "select",
      "initialValue": "black",
      "properties": {
        "value": "black"
      },
      "options": ["black", "white"],
      "labels": ["Black <span style='background-color:black;'></span>", "White <span style='background-color:white;'></span>"]
    }, {
      "target": "$BackgroundImage",
      "name": "Background Image",
      "type": "file",
      "groupName": "backgrounds",
      "groupType": "image",
      "initialValue": "https://s0.2mdn.net/creatives/assets/1951882/transparent.png"
    }
  ]
}
```

The frame templates contain normal json structure for elements, frames and animation. The dynamic variables are noted with the ${VARIABLE} and a direct string replacement occurs on the platform to replace it with the default value or the users input. There are different types of replacement that can be used. The most commonly used types will be file, radio, text and number.

The target notes the variable that it will replace, the name is the label applied inn the platform. The type affects how it will be replaced. Group name is the tab that it will be a part of in Orca. The initialValue is the default value that is baked into the template.

For number type, a max, a min and a step must also be specified.

For the radio type, an array of options must be defined and an array of values. The option is what the variable will be replaced with and the label is how it will appear in the platform.

It is important to note that for the file type, the default value should be a transparent image to prevent issues on safari.

The order that the config is written affects the order of the tabs on the platform as well as the content of the tabs. Ensure that the group names are consistent as well as the ordering of the configs to prevent inconsistencies across different frames/sizes.

---

## Section 5 - Thumbnails

Thumbnails for each frame must be included. If a thumbnail doesnt exist then it breaks the platform. The thumbnail are a graphical representation of the options the frame contains. These are only relevant for the platform and not the served adverts.

---

## Section 6 - Find and replace concept

Because the way that the platform works is a simple find and replace there are some small pitfalls that you must avoid. When specifing a pixel value eg `20px` by using a number it should be defined as `$IntegerVariableNamepx` where the target is `$IntegerVariableName`. Otherwise the css rule will be invalid and not display.

When using multiple of similarly named elements eg `$BackgroundImage`, it is important to use incrementers at the start of the variable name instead of the end as it will find and replace both instances with the original. An example is below:

variables: $BackgroundImage, $BackgroundImage2
$BackgroundImage will replace both variables as it has the same string at the start.

variables: $BackgroundImage, $Background2Image
$BackgroundImage will not replace both variables as it has a different string.

---

## Section 7 - Making changes to templates

The way Orca is meant to work is that the central client has signed off all of the designs and that they are then locked in. Changes should all be made before people can start building the adverts. In the event that changes do need to be made later, it is very important that they are made with great thought and care.

If changing a template itself rather than dynamic variables, keep in mind that it will affect all templates and all markets that have access to that as well as any live creatives.

If changing the variables you must make additive changes. When running deployments a check is done to ensure that the varaibles are all within the range set. If a set of integers has a range of 12-14 and the range is changed to 16-18, any creatives with integers outside that range cause the deployment to stop. Changing the range from 12-18 will still allow all creatives to work.

If you need to make drastic changes to a template that will break the system, duplicate the template and treat it as an additional frame template. No creatives will have been made against this template, meaning that it will not break the system.

This is a solution that should be used sparingly.

---

## Section 8 - Initial upload of templates

When the templates are initially uploaded to the platform, it needs to manually be bound to a client, markets under that clients and then the sizes enabled for that market. This needs to be done by an administrator of the platform.

---

## Section 9 - Pre development

The whole concept of Orca was centrally designed and approved templates and then distribution to local markets simply for advert creation. Before starting development, you will receive a document that the client has signed off. This document will define what can be changed by the local markets, what options they have, all of the colours and spacing of elements for each size. It will also contain designs for each frame option available to them and any animations that it should have.

IF YOU HAVE NOT BEEN GIVEN THIS DOCUMENT, DO NOT START DEVELOPMENT.

The key is to keep consistency from frame to frame so it is easier to create 'components' once for each size and then paste them into the frames that use them. The more consistent, the easier it is to change them.

It is better to spend a while planning rather than diving straight in as it will be a lot more work in the long run.

---

