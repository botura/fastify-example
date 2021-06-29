'use strict'

const fp = require('fastify-plugin')
const { SWAGGER_TAGS } = require('../common/swaggerTags')

async function swagger (fastify, opts) {
  fastify.register(require('fastify-swagger'), {
    routePrefix: '/swagger',
    openapi: {
      info: {
        title: 'Awesome project with fastify',
        description: '',
        version: '0.1.0'
      },
      servers: [{
        url: `http://localhost:${process.env.PORT || 3000}`
      }],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          }
        }
      },
      security: [
        { bearerAuth: [] }
      ],
      tags: Object.values(SWAGGER_TAGS)

    },
    uiConfig: {
      docExpansion: 'none'
      // displayRequestDuration: true
    },
    hideUntagged: false,
    exposeRoute: true
  })
  console.log(`Swagger listening at http://localhost:${process.env.PORT}/swagger`)
}

module.exports = fp(swagger)
