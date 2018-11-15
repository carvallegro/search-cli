# CLI Search
> See [Instructions](./INSTRUCTIONS.md)


### Potential dependencies

- https://github.com/Automattic/cli-table
- https://github.com/timoxley/columnify

- https://github.com/f/omelette
- https://github.com/samverschueren/listr
- https://github.com/isaacs/node-jake

## Dependencies

### CLI utilities
- [commander](https://github.com/tj/commander.js): command-line interfaces made easy
- [chalk](https://github.com/chalk/chalk): colorful outputs.
- [ora](https://github.com/sindresorhus/ora): wait in style.
- [string-width](https://github.com/sindresorhus/string-width)
- [conf](https://github.com/sindresorhus/conf)

### Search libraries🎉

- 🎉 [fusejs](https://github.com/krisk/fuse/): Selected this search library over the other mainly because it has the most stars on Github, which is kind of an indicator of quality but also means more support from the community.

### General libraries

- [Lodash](https://lodash.com/docs/4.17.11): because Lodash.

### Rejected dependencies

#### CLI utilities

- [cliffy](https://github.com/drew-y/cliffy): If I needed more features or a full blown CLI app i'd have use this.
- [multi-spinner](https://github.com/codekirei/node-multispinner): Just liked ora better
- https://github.com/kentcdodds/cross-env

### Search Libraries

- [js-search](https://github.com/bvaughn/js-search)
- [elasticlunr.js](https://github.com/weixsong/elasticlunr.js)
- [lunr.js](https://github.com/olivernn/lunr.js)

## Technical decisions

- Use Lodash

### Search engine

- Use Fuse.js because that's more efficient than my work anyway so I might as well (+ efficient)
- Use Pure functional programming because I've been wanting and that was the occasion. Kept the Pure functional programming only for the search code because I'm slower because I'm newb.
- Pure Functional allows to do it once, test it once and we're done.
- Found that it's hard to figure out the coverage efficiently
