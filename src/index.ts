import log from 'consola'
import { readFile, stat } from 'fs/promises'
import { defineNuxtModule, isNuxt2 } from '@nuxt/kit'
import { basename, join } from 'pathe'
import type { Nuxt } from '@nuxt/schema'

import { name } from '../package.json'
import readArticlePathList from './read-articles'
import markdownToHtml from './markdown-to-html'
import createApi from './create-api'
import type { Article, ArticleListData, NuxtArticlesOptions } from './types'

// Should include types only
export * from './types'

export default defineNuxtModule<NuxtArticlesOptions>({
  meta: {
    name,
    configKey: 'articles',
  },
  defaults: {
    // default module options
    articlesDir: 'articles',
    apiPath: '/articles',
  },
  async setup(options: NuxtArticlesOptions, nuxt) {
    // not support nuxt2
    if (isNuxt2(nuxt)) {
      log.error('Sorry, Nuxt.js v2 is not support. Please use `@nuxt/content`')
      return
    }

    nuxt.hook('build:before', async () => buildArticles(options, nuxt))
    nuxt.hook('builder:watch', async () => buildArticles(options, nuxt))
  },
})

async function buildArticles(options: NuxtArticlesOptions, nuxt: Nuxt): Promise<void> {
  // read articles directory
  const articlePathList = await readArticlePathList(join(nuxt.options.srcDir, options.articlesDir))

  const articlesList: ArticleListData[] = [] // list api
  const articleDetails: Record<string, Article> = {} // content api

  for (const articlePath of articlePathList) {
    const filename = basename(articlePath).replace(/\.md$/, '')
    const { birthtime: published } = await stat(articlePath)
    const articleContent = (await readFile(articlePath)).toString()
    const vFile = await markdownToHtml(articleContent)

    // add articles list
    articlesList.push({
      ...vFile.data,
      slug: filename,
      published: published.toISOString(),
    })

    // add article details
    articleDetails[filename] = {
      ...vFile.data,
      published: published.toISOString(),
      content: String(vFile),
    }
  }

  await createApi(join(nuxt.options.srcDir, 'server/api/'), options.apiPath, articlesList, articleDetails)
}
