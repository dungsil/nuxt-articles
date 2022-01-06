<h1 align="center">nuxt-articles</h1>
<p align="center">
A simple Git-based headless CMS for simple websites.
</p>

<p align="center">
	<b>Language</b><br>
	English | <a href="./README.ko.md">한국어</a>
</p>

## Features
 - Simple usage

## TODO
 - Customizable remark, rehype plugins
 - Syntax highlighting to code blocks

## Differences from `@nuxt/content`
 - Only support markdown
 - Provides only HTTP API
 - (Currently) Support Nuxt v3

## Installation
```bash
npm install -D @dungsil/nuxt-articles
```
```javascript
// nuxt.config.ts

export default {
  buildModules: ['@dungsil/nuxt-articles']
}
```
```gitignore
# .gitignore
server/api/articles.ts
```
  - Depending on the `srcDir` you may need to change it.

## License & Credit
MIT License &copy; 2022 [Kim Younggeon](https://younggeon.kim)

Inspired by [`@nuxt/content`](https://content.nuxtjs.org/) \
Reference by [`@unocss/nuxt`](https://github.com/antfu/unocss/tree/main/packages/nuxt)
