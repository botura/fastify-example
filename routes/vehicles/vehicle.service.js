'use strict'

const { Op, QueryTypes } = require('sequelize')
const VehicleModel = require('./vehicle.model')

class UserService {
  constructor (fastify) {
    this.fastify = fastify
    this.vehicleModel = VehicleModel(fastify.sequelize)
  }

  // ======== add
  async add (request) {
    const vehicle = request.body
    vehicle.userId = request.token.id

    return await this.vehicleModel.create(request.body)
  }

  // ======== edit
  async edit (request) {
    // search
    const vehicle = await this.vehicleModel.findByPk(request.params.id)

    // not found
    if (!vehicle) throw this.fastify.httpErrors.notFound()

    // only onwer can edit his vehicle
    if (vehicle.userId !== request.token.id) throw this.fastify.httpErrors.unauthorized()

    // update
    for (const prop in request.body) {
      vehicle[prop] = request.body[prop]
    }
    await vehicle.save()

    return vehicle
  }

  // ======== destroy
  async destroy (request) {
    // search
    const vehicle = await this.vehicleModel.findByPk(request.params.id)

    // not found
    if (!vehicle) throw this.fastify.httpErrors.notFound()

    // only onwer can destroy his vehicle
    if (vehicle.userId !== request.token.id) throw this.fastify.httpErrors.unauthorized()

    // delete
    await vehicle.destroy()

    return 'Deleted'
  }

  // ======== byPk
  async byPk (id) {
    return this.vehicleModel.findByPk(id, {
      include: [
      //   { model: this.fastify.userService.userModel, attributes: ['name', 'email'] },
      //   { model: this.fastify.manufacturerService.manufacturerModel, attributes: ['name'] }
        'user',
        'manufacturer'
      ]
    })
  }

  // ======== list
  async list (request) {
    const { id, userId, manufacturerId, year, username } = request.query
    const where = {}

    // search by id
    if (id) where.id = id

    // search by userId
    if (userId) where.userId = userId

    // search by manufacturerId
    if (manufacturerId) where.manufacturerId = manufacturerId

    // search by year
    if (year) where.year = year

    // search by username
    if (username) where['$user.name$'] = { [Op.iLike]: `%${username}%` }

    return this.vehicleModel.findAll({
      where,
      // order: [['name', 'ASC']],
      include: [
        { model: this.fastify.userService.userModel, attributes: ['name', 'email'] },
        { model: this.fastify.manufacturerService.manufacturerModel, attributes: ['name'] }
        // 'user',
        // 'manufacturer'
      ]
    })
  }

  // ======== raw query
  async raw (request) {
    const { id, userId, manufacturerId, year, username } = request.query

    let sqlQuery = 'SELECT vehicle.id, vehicle.year, vehicle.price, vehicle.firstowner as "firstOwner",' +
      ' "user".id AS "user.id", "user".name AS "user.name", "user".email AS "user.email",' +
      ' manufacturer.id AS "manufacturer.id", manufacturer.name AS "manufacturer.name"' +
      ' FROM vehicles AS vehicle' +
      ' LEFT OUTER JOIN users AS "user" ON vehicle.userid = "user".id' +
      ' LEFT OUTER JOIN manufacturers AS manufacturer ON vehicle.manufacturerid = manufacturer.id' +
      ' WHERE TRUE'

    // search by id
    if (id) sqlQuery += ' AND vehicle.id = :id'

    // search by userId
    if (userId) sqlQuery += ' AND "user".id = :userId'

    // search by manufacturerId
    if (manufacturerId) sqlQuery += ' AND manufacturerId = :manufacturerId'

    // search by year
    if (year) sqlQuery += ' AND year = :year'

    // search by username
    if (username) sqlQuery += ' AND "user".name ILIKE :username'

    const result = this.fastify.sequelize.query(sqlQuery, {
      nest: true,
      type: QueryTypes.SELECT,
      replacements: {
        id,
        userId,
        manufacturerId,
        year,
        username: `%${username}%`
      }
    })
    return result
  }
}

module.exports = UserService
