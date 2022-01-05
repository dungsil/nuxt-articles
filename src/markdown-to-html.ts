import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkExtractFrontmatter from 'remark-extract-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkHeadings from '@vcarl/remark-headings'
import yaml from 'yaml'

import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypePrism from '@mapbox/rehype-prism'
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'

export default async (content) =>
  await unified()
    // markdown process
    .use(remarkParse) // Markdown parser
    .use(remarkGfm) // GFM support
    .use(remarkHeadings)
    .use(remarkFrontmatter) // frontmatter support
    .use(remarkExtractFrontmatter, { yaml: yaml.parse }) // extract frontmatter to data
    // html process
    .use(remarkRehype) // html compiler
    .use(rehypeAccessibleEmojis)
    .use(rehypePrism) // code highlighter
    .use(rehypeSanitize) // dirty html purge
    .use(rehypeSlug) // create header id
    .use(rehypeAutolinkHeadings) // create header link
    .use(rehypeExternalLinks, { target: '_blank' })
    .use(rehypeStringify)
    .process(content) // markdown content
