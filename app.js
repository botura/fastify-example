'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')

module.exports = async function (fastify, opts) {
  // Place here your custom code!
  fastify.get('/', async function (request, reply) {
    return {
      ping: 'Hello World',
      apiUrl: `http://localhost:${process.env.PORT}/api`,
      swaggerUrl: `http://localhost:${process.env.PORT}/swagger`
    }
  })

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, { prefix: '/api' }),
    ignorePattern: /.*(model|schema|service)\.js/
  })
}
