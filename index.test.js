'use strict'

const { test } = require('ava')
const pCache = require('.')

const sinon = require('sinon')

test('basic', async t => {
  const stub = sinon.stub()
    .resolves('foo')

  const func = pCache({ max: 10 })(stub)
  const val0 = await func()
  t.deepEqual(val0, 'foo')
  t.deepEqual(stub.callCount, 1)

  const val1 = await func()
  t.deepEqual(val1, 'foo')
  t.deepEqual(stub.callCount, 1)

  for (let i = 0; i < 10; ++i) {
    const val = await func(i)
    t.deepEqual(val, 'foo')
    t.deepEqual(stub.callCount, 2 + i)
  }

  const val2 = await func()
  t.deepEqual(val2, 'foo')
  t.deepEqual(stub.callCount, 12)
})
