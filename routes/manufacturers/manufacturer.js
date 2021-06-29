'use strict'

const {
  addSchema,
  editSchema,
  deleteSchema,
  listSchema
} = require('./manufacturer.schema')

module.exports = async function (fastify, opts) {
  // is authenticated ?
  fastify.addHook('onRequest', fastify.authenticate)

  // ======== add
  fastify.post('/', { schema: addSchema }, async (request) => {
    const result = await fastify.manufacturerService.add(request)
    return result
  })

  // ======== edit
  fastify.put('/:id', { schema: editSchema }, async (request) => {
    const result = await fastify.manufacturerService.edit(request)
    return result
  })

  // ======== delete
  fastify.delete('/:id', { schema: deleteSchema }, async (request) => {
    const result = await fastify.manufacturerService.destroy(request)
    return result
  })

  // ======== list
  fastify.get('/', { schema: listSchema }, async (request) => {
    const result = await fastify.manufacturerService.list(request)
    return result
  })
}
