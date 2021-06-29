'use strict'

const fp = require('fastify-plugin')
const UserService = require('../routes/users/user.service')
const ManufacturerService = require('../routes/manufacturers/manufacturer.service')
const VehicleService = require('../routes/vehicles/vehicle.service')

function plugin (fastify, options, done) {
  // decorate fastify instance with database services so they available everywhere

  // userService
  const userService = new UserService(fastify)
  fastify.decorate('userService', userService)

  // userService
  const manufacturerService = new ManufacturerService(fastify)
  fastify.decorate('manufacturerService', manufacturerService)

  // userService
  const vehicleService = new VehicleService(fastify)
  fastify.decorate('vehicleService', vehicleService)

  done()
}

module.exports = fp(plugin, {
  // force load these plugin before
  dependencies: ['plugin-sequelize', 'plugin-sensible']
})
