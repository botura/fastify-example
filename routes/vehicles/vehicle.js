'use strict'

const {
  addSchema,
  editSchema,
  deleteSchema,
  byPkSchema,
  listSchema
} = require('./vehicle.schema')

module.exports = async function (fastify, opts) {
  // is authenticated ?
  fastify.addHook('onRequest', fastify.authenticate)

  // ======== add
  fastify.post('/', { schema: addSchema }, async (request) => {
    const result = await fastify.vehicleService.add(request)
    return result
  })

  // ======== edit
  fastify.put('/:id', { schema: editSchema }, async (request) => {
    const result = await fastify.vehicleService.edit(request)
    return result
  })

  // ======== delete
  fastify.delete('/:id', { schema: deleteSchema }, async (request) => {
    const result = await fastify.vehicleService.destroy(request)
    return result
  })

  // ======== byPk
  fastify.get('/:id', { schema: byPkSchema }, async (request) => {
    const { id } = request.params
    const result = await fastify.vehicleService.byPk(id)
    return result
  })

  // ======== list
  fastify.get('/', { schema: listSchema }, async (request) => {
    const result = await fastify.vehicleService.list(request)
    return result
  })

  // ======== list raw query
  fastify.get('/raw', { schema: listSchema }, async (request) => {
    const result = await fastify.vehicleService.raw(request)
    return result
  })
}
