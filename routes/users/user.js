'use strict'

const {
  loginSchema,
  verifyTokenSchema,
  addSchema,
  editSchema,
  deleteSchema,
  listSchema
} = require('./user.schema')

module.exports = async function (fastify, opts) {
  // login
  fastify.post('/login', { schema: loginSchema }, async (request, reply) => {
    // find user
    const user = await fastify.userService.login(request)

    // not found
    if (!user) throw fastify.httpErrors.unauthorized()

    // create token
    const token = fastify.jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      {
        expiresIn: '8h'
      })

    return token
  })

  // verify token
  fastify.get('/login', { preValidation: [fastify.authenticate], schema: verifyTokenSchema }, (request, reply) => {
    return request.token
  })

  // ======== add
  fastify.post('/', { schema: addSchema }, async (request) => {
    const result = await fastify.userService.add(request)
    return result
  })

  // ======== edit
  fastify.put('/:id', { preValidation: [fastify.authenticate], schema: editSchema }, async (request) => {
    const result = await fastify.userService.edit(request)
    return result
  })

  // ======== delete
  fastify.delete('/:id', { preValidation: [fastify.authenticate], schema: deleteSchema }, async (request) => {
    const result = await fastify.userService.destroy(request)
    return result
  })

  // ======== list
  fastify.get('/', { preValidation: [fastify.authenticate], schema: listSchema }, async (request) => {
    const result = await fastify.userService.list(request)
    return result
  })
}
