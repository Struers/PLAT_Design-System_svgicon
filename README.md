# vue-svgicon

[![Build Status](https://img.shields.io/travis/MMF-FE/vue-svgicon.svg?style=flat-square)](https://travis-ci.org/MMF-FE/vue-svgicon)

Use inline Svg icon in Vue.js. (vue 2.x) [中文](./README-CN.md)

## demo

https://mmf-fe.github.io/vue-svgicon/v4/

## Some issues

-   [Work on IE and old browser](#work-on-ie-and-old-browser)

## Usage

### Install

```bash
# install vue-svgicon and vue-svgicon-loader
npm install vue-svgicon@next
npm install @yzfe/vue-svgicon-loader --dev
```

### Webpack config

```js
{
    module: {
        rules: [
            {
                test: /\.svg$/,
                include: ['SVG source file path'],
                use: [
                    {
                        loader: '@yzfe/vue-svgicon-loader',
                        options: {
                            idSeparator: '_',
                            svgFilePath: 'SVG source file path'
                        }
                    }
                ]
            },
            // Recommend config, transformAssetUrls
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            transformAssetUrls: {
                                icon: 'data'
                            }
                        }
                    }
                ]
            }
        ]
    }
}
```

### Register vue-svgicon plugin

#### Typescript

```ts
import Vue from 'vue'
import VueSvgIcon, { PluginOptions } from 'vue-svgicon'

// [optional] Default vue-svgicon style, you can use your own.
// source: https://github.com/MMF-FE/vue-svgicon/blob/dev/packages/vue-svgicon/src/style.scss
import 'vue-svgicon/dist/svgicon.css'

Vue.use<PluginOptions>(VueSvgIcon, {
    tagName: 'icon'
})
```

### Use icon

```html
<template>
    <div>
        <icon
            :data="vueIcon"
            width="200"
            height="200"
            color="#42b983 #35495e"
        />
    </div>
</template>
<script>
    import vueIcon from '@/assets/svg/vue.svg'

    export default {
        data() {
            return {
                vueIcon
            }
        }
    }
</script>
```

#### transformAssetUrls

If the vue-loader has the transformAssetUrls option set, you can use the SVG file path directly in the template without import SVG in JS.

```html
<template>
    <div>
        <icon
            data="~assets/svg/vue.svg"
            width="200"
            height="200"
            color="#42b983 #35495e"
        />
    </div>
</template>
```

## @yzfe/vue-svgicon-loader options

#### idSeparator [optional]

The id separator to generate unique id attribute. Default is `'_'`.

```html
<svg version="1.1" viewBox="0 0 200 200">
    <defs>
        <clipPath id="svgicon_mask_a">
            <path pid="0" d="M0 0h200v100H0z"></path>
        </clipPath>
    </defs>
    <circle
        pid="1"
        cx="100"
        cy="100"
        r="100"
        clip-path="url(#svgicon_mask_a)"
    ></circle>
</svg>
```

#### svgFilePath [optional]

The svg file path, use to generate unique id attribue. Default is `process.cwd()` 。

## Plugin options

### tagName

Custom component tag name. Default is **svgicon**

```js
Vue.use(VueSvgIcon, {
    tagName: 'svgicon'
})
```

```html
<svgicon data="./vue.svg"></svgicon>
```

### classPrefix

your can use `classPrefix` option to set the default class name. The default prefix is `svg`

```js
Vue.use(VueSvgIcon, {
    classPrefix: 'vue-svg'
})
```

It will be generated like this:

```html
<svg
    version="1.1"
    viewBox="0 0 4 7"
    class="vue-svg-icon vue-svg-fill vue-svg-up"
>
    <!-- svg code -->
</svg>
```

### defaultWidth / defaultHeight

Set default size if size props not set.

### isStroke

Is use stroke style by default.

### isOriginalDefault

Is use original color by default.

## Component Props

### data

Svg icon data, look like:

```ts
export interface IconData {
    width: number
    height: number
    viewBox: string
    data: string // Optimized Svg content
    [key: string]: any
}

export interface Icon {
    name: string
    data: IconData
}
```

Usually the svg icon data is generated by @yzfe/vue-svgicon-loader.

### dir

The direction of icon.

```html
<icon data="arrow.svg" width="50" height="50" dir="left"></icon>
<icon data="arrow.svg" width="50" height="50" dir="up"></icon>
<icon data="arrow.svg" width="50" height="50" dir="right"></icon>
<icon data="arrow.svg" width="50" height="50" dir="down"></icon>
```

### fill

Whether to fill the path/shape. Default value is **true**

```html
<icon data="arrow.svg" width="50" height="50"></icon>
<icon data="arrow.svg" width="50" height="50" :fill="false"></icon>
```

You can use **r-color** to reverse the fill property.

```html
<!-- the first one is fill(default), the second use stroke -->
<icon
    data="clock.svg"
    color="#8A99B2 r-#1C2330"
    width="100"
    height="100"
></icon>
<!-- the first one is stoke, the second is fill -->
<icon
    data="clock.svg"
    color="#8A99B2 r-#1C2330"
    width="100"
    height="100"
    :fill="false"
></icon>
```

### width / height

Specify the size of icon. Default value is **16px / 16px**. Default unit is **px**

```html
<icon data="arrow.svg" width="50" height="50"></icon>
<icon data="arrow.svg" width="10em" height="10em"></icon>
```

### scale

Scale icon size, it will overwrite width/height prop

```html
<icon data="arrow.svg" scale="10"></icon>
<icon data="arrow.svg" scale="10" width="10em" height="10em"></icon>
```

### color

Specify the color of icon. Default value is **inherit**.

```html
<p style="color: darkorange">
    <icon data="arrow.svg" width="50" height="50"></icon>
    <icon data="arrow.svg" width="50" height="50" color="red"></icon>
    <icon data="arrow.svg" width="50" height="50" color="green"></icon>
    <icon data="arrow.svg" width="50" height="50" color="blue"></icon>
</p>
```

If the icon is mutil path/shape, you can use mutil color. It is defined in the order of path/shape.

```html
<icon data="vue.svg" width="100" height="100" color="#42b983 #35495e"></icon>
```

Also, you can use CSS to add colors.

```html
<icon class="vue-icon" data="vue.svg" width="100" height="100"></icon>
```

```css
.vue-icon path[pid='0'] {
    fill: #42b983;
}

.vue-icon path[pid='1'] {
    fill: #35495e;
}
```

Use gradient

```html
<template>
    <svg>
        <defs>
            <linearGradient id="gradient-1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stop-color="#57f0c2" />
                <stop offset="95%" stop-color="#147d58" />
            </linearGradient>
            <linearGradient id="gradient-2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stop-color="#7295c2" />
                <stop offset="95%" stop-color="#252e3d" />
            </linearGradient>
        </defs>
    </svg>
    <icon
        data="vue.svg"
        width="15rem"
        height="15rem"
        color="url(#gradient-1) url(#gradient-2)"
    ></icon>
</template>
```

### original

use original color

```html
<icon data="colorwheel.svg" width="100" height="100" original></icon>
<!-- overwrite original color -->
<icon
    data="colorwheel.svg"
    width="100"
    height="100"
    original
    color="_ black _ black _"
></icon>
```

### Preview SVG icons

Use `@yzfe/vue-svgicon-viewer` preview SVG icons

```bash
# Install global
npm install -g @yzfe/vue-svgicon-viewer

# Install in project
npm install  @yzfe/vue-svgicon-viewer --dev

# Use command
vsvg-viewer ./svg/folder
```

### Work on IE and old browser

This component doesn't work on IE because IE don't support `innerHTML` in SVGElement. You can use [innersvg-polyfill](innersvg-polyfill) to make it work. You can also use the polyfill provided by `@yzfe/vue-svgicon-polyfill`.

```js
// in main.js first line
import '@yzfe/vue-svgicon-polyfill'
```

This polyfill is a wrapper of [innersvg-polyfill](https://github.com/dnozay/innersvg-polyfill).
