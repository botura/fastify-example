'use strict'

const fp = require('fastify-plugin')
const Sequelize = require('sequelize')

function plugin (fastify, options) {
  const sequelize = new Sequelize(process.env.PG_CONNECTION_STRING)

  return sequelize.authenticate().then(decorate)

  function decorate () {
    fastify.decorate('sequelize', sequelize)
    fastify.addHook('onClose', (fastifyInstance, done) => {
      console.log('Closing connection to database')
      sequelize.close()
        .then(done)
        .catch(done)
    })
  }
}

module.exports = fp(plugin, {
  name: 'plugin-sequelize'
})
