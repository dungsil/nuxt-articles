export interface NuxtArticlesOptions {
  articlesDir: string
  apiPath: string
}

export interface Article extends Record<string, string | number | boolean> {
  content: string
  published: string
}

export interface ArticleListData extends Record<string, string> {
  slug: string
  published: string
}
