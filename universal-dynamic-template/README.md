# README

## Introduction

This is the template for Mobile5's dynamic advertising universal template as well as containing the tools required to create a deployment ready script to be included in all dynamic advertising. When included in a dynamic creative, all that is required is one JSON object to be passed into the script, following the schema required, and it will bootstrap the advert in its entirety, animation included.

## How to use it

1. Run the command `npm start` from the root of the project. This will minify the latest version and move it to the `dist` directory.

1. In your html file, create a div with the class `dynamicAdvertContainer`, this will be the target for the dynamic builder.

1. Include the file `./dist/dynamicBuilder.min.js` in your project and reference it at the bottom of your body before your other scripts.

1. Call the `buildDOM()` function, passing the id or class of the container eg. `'.banner-container'` and the data in that order. It should look like this `buildDOM('.banner-container', data)`.

1. Upon completion of the `buildDOM` function, call the `startAnimation(0)` function, passing a zero to indicate the start of the array of data.


## How it works

The script works by iterating through each object in the array, discerning what type of object it is and then applying styles and animations where appropriate.

There are four types of object currently:

* `j` - Javascript that will be applied to the bottom of the body to allow for scripting within the banner. It must take the form of base64 encoding and will be wrapped within script tags.

* `s` - Styles that will be applied to the parent div to allow for animation classes, font files and other generic styling.

* `e` - Elements can be a global element or nested inside a frame. Its animation timings are relevant to its environment.

* `f` - Frames are the only element that can contain others, they are displayed in order that they occur in the array.

### !!! IMPORTANT !!!

Javascript that is bound to an element or frame can target the parent node by utilising the variable `parentNode` in the script.

All global elements must be declared before the frames to prevent timing abnormalities. All frames must be entered into the JSON in the order that they will be displayed.

### Schema

Below is the schema for all adverts with notes:

```json
[
    {
        "t": "j", // type
        "s": "{!!! base64 encoded script !!!}" // body scripts
    },
    {
        "t": "s", // type
        "s": "{!!! css inline style chain !!!}" // body styles
    },
    {
        "t": "e", // type
        "i": "{string}", // div id
        "c": "{string}", // div classlist
        "h": "{string}", // inner html
        "s": "{!!! css inline style chain !!!}", // starting styles
        "a": { // animation
            "s": "{integer in ms}", // start time
            "e": "{integer in ms}", // end time
            "n": "{!!! css transition value !!!}", // transition enter
            "x": "{!!! css transition value !!!}", // transition exit
            "b": "{!!! css inline style chain !!!}", // enter css
            "a": "{!!! css inline style chain !!!}" // exit css
        },
        "j": {
            "s": "{base64 encoded javascript}", // base64 encoded javascript that will fire at the start of the animation,
            "e": "{base64 encoded javascript}" // base64 encoded javascript that will fire at the end of the animation,
        }
    },
    {
        "t": "f", // type
        "i": "{string}", // div id
        "c": "{string}", // div classlist
        "h":  "{string}", // inner html
        "d": "{integer in ms}", // duration
        "s": "{!!! css inline style chain !!!}", // starting styles
        "e": [ { // inner elements
                "t": "e", // type
                "i": "{string}", // div id
                "h": "{string}", // inner html
                "s": "{!!! css inline style chain !!!}",
                "a": { // animation
                    "s": "{integer in ms}", // start time
                    "e": "{integer in ms}", // end time
                    "n": "{!!! css transition value !!!}", // transition enter
                    "x": "{!!! css transition value !!!}", // transition exit
                    "b": "{!!! css inline style chain !!!}", // enter css
                    "a": "{!!! css inline style chain !!!}" // exit css
                },
                "j": {
                    "s": "{base64 encoded javascript}", // base64 encoded javascript that will fire at the start of the animation,
                    "e": "{base64 encoded javascript}" // base64 encoded javascript that will fire at the end of the animation,
                }
            }
        ],
        "a": { // animation
            "n": "{!!! css transition value !!!}", // transition enter
            "x": "{!!! css transition value !!!}", // transition exit
            "b": "{!!! css inline style chain !!!}", // enter css
            "a": "{!!! css inline style chain !!!}" // exit css
        },
        "j": {
            "s": "{base64 encoded javascript}", // base64 encoded javascript that will fire at the start of the animation,
            "e": "{base64 encoded javascript}" // base64 encoded javascript that will fire at the end of the animation,
        }
    }
]
```

## How to generate the template after updates

To regenerate the template, simply run the command `npm start` in the terminal.
