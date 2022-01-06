import log from 'consola'
import { defineNuxtModule, isNuxt2 } from '@nuxt/kit'
import { basename, join } from 'pathe'
import { readFile, stat } from 'fs/promises'
import type { Article, ArticleListData, Nuxt3ContentOptions } from './types'

import { name } from '../package.json'
import readArticlePathList from './read-articles'
import markdownToHtml from './markdown-to-html'
import createApi from './create-api'

// Should include types only
export * from './types'

export default defineNuxtModule<Nuxt3ContentOptions>({
  meta: {
    name,
    configKey: 'content',
  },
  defaults: {
    // default module options
    articlesDir: 'articles',
    apiPath: '/articles',
  },
  async setup(options: Nuxt3ContentOptions, nuxt) {
    // not support nuxt2
    if (isNuxt2(nuxt)) {
      log.error('Sorry, Nuxt.js v2 is not support. Please use `@nuxt/content`')
      return
    }

    // Create articles before nuxt build
    nuxt.hook('build:before', async () => {
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

      log.success('Create articles API')
    })
  },
})