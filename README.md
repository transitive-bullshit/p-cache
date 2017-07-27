# p-cache

> Simple wrapper to cache the results of promise-returning async functions via lru-cache.

[![NPM](https://img.shields.io/npm/v/p-cache.svg)](https://www.npmjs.com/package/p-cache) [![Build Status](https://img.shields.io/circleci/project/github/fisch0920/p-cache.svg)](https://circleci.com/gh/fisch0920/p-cache) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Features

- Uses [lru-cache](https://www.npmjs.com/package/lru-cache) for caching impl
- Uses [object-hash](https://www.npmjs.com/package/hash-object) for implicit cache key derivation from function args
- Thoroughly tested in production

## Install

```bash
npm install --save p-cache
```

## Usage

```js
const request = require('request-promise-native')

const pCache = require('p-cache')({
  label: 'test-service',
  // pass args to lru-cache here
  max: 1000
})

// returns an async function which gets the given url, with the results being 
// cached via lru-cache up to 1000 urls
module.exports = pCache(async (url) => {
  return request(url)
})
```

## API

### function pCache(opts)

Returns a function decorator that will wrap calls to the target function in an lru-cache instance defined by these `opts`.

- `opts` - object, optional
- `opts.label` - string, optional label to use for displaying cache hits and misses
- `opts.log` - function, optional function to use for displaying cache hits and misses (default: `console.log`)

*Note* all unrecognized options are passed onto [lru-cache](https://github.com/isaacs/node-lru-cache)
- `opts.max` - number, optional passed onto [lru-cache](https://github.com/isaacs/node-lru-cache)
- `opts.maxAge` - number, optional passed onto [lru-cache](https://github.com/isaacs/node-lru-cache)
- `opts.length` - function, optional passed onto [lru-cache](https://github.com/isaacs/node-lru-cache)
- `opts.dispose` - function, optional passed onto [lru-cache](https://github.com/isaacs/node-lru-cache)
- `opts.stale` - boolean, optional passed onto [lru-cache](https://github.com/isaacs/node-lru-cache)
- `opts.noDisposeOnSet` - boolean, optional passed onto [lru-cache](https://github.com/isaacs/node-lru-cache)

`pCache(opts) => Function<Promise>(async function(...args))`

## License

MIT © [Travis Fischer](https://github.com/fisch0920)
