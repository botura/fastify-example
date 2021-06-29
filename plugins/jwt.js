'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts) {
  fastify.register(require('fastify-jwt'), {
    decode: { complete: true },
    secret: process.env.JWT_SECRET
  })

  fastify.decorateRequest('token', null)

  fastify.decorate('authenticate', async function (request, reply) {
    try {
      const { authorization } = request.headers
      if (!authorization || !authorization.startsWith('Bearer ')) {
        const errorMessage = { message: 'Incomplete authorization header' }
        throw errorMessage
      }
      const token = authorization.substring(7, authorization.length)
      request.token = fastify.jwt.verify(token)
    } catch (err) {
      reply.code(401).send(err)
    }
  })

  // fastify.addHook('onRequest', async (request, reply) => {
  //   try {
  //     await request.jwtVerify()
  //   } catch (err) {
  //     reply.send(err)
  //   }
  // })
})
