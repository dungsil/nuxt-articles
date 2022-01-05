import { join } from 'pathe'
import { writeFile, mkdir } from 'fs/promises'
import { Article, ArticleListData } from './types'

export default async (
  apiDir: string,
  apiFilename: string,
  list: ArticleListData[] = [],
  details: Record<string, Article>
) => {
  await mkdir(apiDir, { recursive: true })

  let detailsJsonData = ''
  for (const key in details) {
    detailsJsonData += `${key}:` + JSON.stringify(details[key]) + ','
  }

  await writeFile(
    join(apiDir, `${apiFilename}.ts`),
    `
import type { IncomingMessage } from 'http'

const db = {list: ${JSON.stringify(list)},${detailsJsonData}}

export default (req: IncomingMessage) => {
  let { pathname } = new URL(req.url, \`https://\${req.headers.host}\`)
  pathname = pathname.replace(/^\\//, '')

  if (pathname) {
    return db[pathname]
  }

  return db.list
}
  `,
    { flag: 'w' }
  )
}
