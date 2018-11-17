# CLI Search [![Build Status](https://travis-ci.com/carvallegro/toy-robot-java.svg?branch=master)](https://travis-ci.com/carvallegro/toy-robot-java) [![codecov](https://codecov.io/gh/carvallegro/search-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/carvallegro/search-cli) [![CodeFactor](https://www.codefactor.io/repository/github/carvallegro/search-cli/badge)](https://www.codefactor.io/repository/github/carvallegro/search-cli)
> See [Instructions](./INSTRUCTIONS.md)


### Potential dependencies

- https://github.com/matiassingers/emoji-flags
- https://github.com/f/omelette
- https://github.com/isaacs/node-jake

## Dependencies

### Search libraries

- 🎉 [fusejs](https://github.com/krisk/fuse/): Selected this search library over the other mainly because it has the most stars on Github, which is kind of an indicator of quality but also means more support from the community.


### CLI utilities

- [commander](https://github.com/tj/commander.js): command-line interfaces made easy
- [chalk](https://github.com/chalk/chalk): Colorful console outputs.
- [columnify](https://github.com/timoxley/columnify): Provide a nice output with aligned columns
- [ora](https://github.com/sindresorhus/ora): Wait in style.
- [string-width](https://github.com/sindresorhus/string-width)
- [conf](https://github.com/sindresorhus/conf)


### General libraries

- [Lodash](https://lodash.com/docs/4.17.11): because Lodash.
- [moment](https://momentjs.com)

### Rejected dependencies

#### CLI utilities

- [cliffy](https://github.com/drew-y/cliffy): If I needed more features or a full blown CLI app i'd have use this.
- [multi-spinner](https://github.com/codekirei/node-multispinner): Just liked ora better

### Search Libraries

- [js-search](https://github.com/bvaughn/js-search)
- [elasticlunr.js](https://github.com/weixsong/elasticlunr.js)
- [lunr.js](https://github.com/olivernn/lunr.js)

## Technical decisions

- Use Lodash

### Search engine

- Use Fuse.js because that's more efficient than my work anyway so I might as well (+ efficient)
- Use Pure functional programming because I've been wanting and that was the occasion, and it was fun. Kept the Pure functional programming only for the search code because I'm slower because I'm newb.
- Pure Functional allows to do it once, test it once and we're done.
- Found that it's hard to figure out the coverage efficiently


## What else could be done/discussed

- Better CI (pre-commit hook)
