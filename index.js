'use strict'

const LRUCache = require('lru-cache')
const hash = require('object-hash')

module.exports = (opts) => {
  const log = opts.log || console.log.bind(console)
  const label = opts.label || ''

  const cache = LRUCache(opts)
  const stats = {
    numHits: 0,
    numMisses: 0
  }

  return (asyncFunc) => {
    return (...args) => {
      const key = hash(args)
      const cached = cache.get(key)

      if (cached) {
        log(`${label} cache hit ${++stats.numHits}`)
        return cached
      }

      log(`${label} cache miss ${++stats.numMisses}`)
      return asyncFunc(...args)
        .then((value) => {
          cache.set(key, value)
          return value
        })
    }
  }
}
