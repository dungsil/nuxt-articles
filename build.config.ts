import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  declaration: true,
  rollup: {
    emitCJS: true,
  },
  entries: [{ input: 'src/index' }],
  externals: ['@nuxt/schema'],
})
