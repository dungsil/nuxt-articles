import { mkdir, writeFile } from 'fs/promises'
import type { Article, ArticleListData } from './types'
import { join } from 'pathe'

export default async (dir: string, list: ArticleListData[], details: Record<string, Article>) => {
  // create articles directory
  await mkdir(dir, { recursive: true })
}
