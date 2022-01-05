import { readdir } from 'fs/promises'
import { resolve } from 'path'

async function* _readArticles(dir: string): AsyncGenerator<string> {
  const direntList = await readdir(dir, { withFileTypes: true })

  for (const dirent of direntList) {
    const fileOrDir = resolve(dir, dirent.name)

    if (dirent.isDirectory()) {
      yield* _readArticles(fileOrDir)
    } else if (dirent.name.endsWith('.md')) {
      // only read markdown
      yield fileOrDir
    }
  }
}

export default async (dir: string): Promise<string[]> => {
  const articles: string[] = []

  for await (const article of _readArticles(dir)) {
    articles.push(article)
  }

  return articles
}
