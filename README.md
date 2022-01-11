<h1 align="center">nuxt-articles</h1>
<p align="center">
A simple Git-based headless CMS for small websites.
</p>

<b align="center">Language</b>
<p align="center">
	English | <a href="https://github.com/dungsil/nuxt-articles/blob/main/README.ko.md">한국어</a>
</p>

## Features
Generate an [API endpoint][LINK_API_ROUTES] with a markdown file you write in the `articles` directory.

## TODO
 - Customizable remark, rehype plugins
 - Syntax highlighting to code blocks

## Differences from `@nuxt/content`
 - Only support markdown
 - Provides only HTTP API
 - (Currently) Support Nuxt v3

## Usages
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

## Contribute
`nuxt-articles` welcomes all contributions! 😍

## License & Credit
MIT License &copy; 2022 [Kim Younggeon](https://younggeon.kim)

Inspired by [`@nuxt/content`](https://content.nuxtjs.org/) \
Reference by [`@unocss/nuxt`](https://github.com/antfu/unocss/tree/main/packages/nuxt)


[LINK_API_ROUTES]: https://v3.nuxtjs.org/docs/directory-structure/server/#api-routes
