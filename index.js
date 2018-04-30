'use strict'

const registry = require('ld-cryptosuite-registry')

const $id = Symbol('id')
const $type = Symbol('type')
const $owner = Symbol('owner')
const $publicKeyHex = Symbol('publicKeyHex')
const $publicKeyJwk = Symbol('publicKeyJwk')
const $publicKeyPem = Symbol('publicKeyPem')
const $publicKeyBase58 = Symbol('publicKeyBase58')
const $publicKeyBase64 = Symbol('publicKeyBase64')

class PublicKey {
  static fromJSON(json) {
    return new PublicKey(json)
  }

  constructor(opts) {
    if (!opts || 'object' != typeof opts || Array.isArray(opts)) {
      throw new TypeError("PublicKey: Expecting an object.")
    }

    if (!opts.id || 'string' != typeof opts.id) {
      throw new TypeError("PublicKey: Expecting id to be a string.")
    }

    if (!opts.type || 'string' != typeof opts.type) {
      throw new TypeError("PublicKey: Expecting type to be a string.")
    }

    if (false == registry.has(opts.type)) {
      throw new TypeError("PublicKey: Expecting valid 'ld-cryptosuite-registry' value.")
    }

    if ('owner' in opts && 'string' != typeof opts.owner) {
      throw new TypeError("PublicKey: Expecting owner to be a string.")
    }

    check('publicKeyHex')
    check('publicKeyJwk')
    check('publicKeyPem')
    check('publicKeyBase58')
    check('publicKeyBase64')

    this[$id] = opts.id
    this[$type] = opts.type
    this[$owner] = opts.owner || opts.id

    this[$publicKeyHex] = opts.publicKeyHex || null
    this[$publicKeyJwk] = opts.publicKeyJwk || null
    this[$publicKeyPem] = opts.publicKeyPem || null
    this[$publicKeyBase58] = opts.publicKeyBase58 || null
    this[$publicKeyBase64] = opts.publicKeyBase64 || null

    function check(key) {
      if (key in opts && ('string' != typeof opts[key] || !opts[key])) {
        throw new TypeError(`PublicKey: Expecting ${key} to be a string.`)
      }
    }
  }

  get id() { return this[$id] }
  get type() { return this[$type] }
  get owner() { return this[$owner] }

  get publicKeyHex() { return this[$publicKeyHex] }
  get publicKeyJwk() { return this[$publicKeyJwk] }
  get publicKeyPem() { return this[$publicKeyPem] }
  get publicKeyBase58() { return this[$publicKeyBase58] }
  get publicKeyBase64() { return this[$publicKeyBase64] }

  toJSON() {
    return {
      id: this[$id],
      type: this[$type],
      owner: this[$owner],
      publicKeyHex: this[$publicKeyHex],
      publicKeyJwk: this[$publicKeyJwk],
      publicKeyPem: this[$publicKeyPem],
      publicKeyBase58: this[$publicKeyBase58],
      publicKeyBase64: this[$publicKeyBase64],
    }
  }
}

module.exports = {
  PublicKey
}