'use strict'

const { Op } = require('sequelize')
const { ROLES } = require('../../common/roles')
const ManufacturerModel = require('./manufacturer.model')

class UserService {
  constructor (fastify) {
    this.fastify = fastify
    this.manufacturerModel = ManufacturerModel(fastify.sequelize)
  }

  // ======== add
  async add (request) {
    // only admnistrators can add a manufacturer
    if (request.token.role !== ROLES.ADMINISTRATOR) throw this.fastify.httpErrors.unauthorized()

    const manufacturer = await this.manufacturerModel.create(request.body)
    return manufacturer
  }

  // ======== edit
  async edit (request) {
    // only admnistrators can edit a manufacturer
    if (request.token.role !== ROLES.ADMINISTRATOR) throw this.fastify.httpErrors.unauthorized()

    // search
    const manufacturer = await this.manufacturerModel.findByPk(request.params.id)

    // not found
    if (!manufacturer) throw this.fastify.httpErrors.notFound()

    // update
    for (const prop in request.body) {
      manufacturer[prop] = request.body[prop]
    }
    await manufacturer.save()

    return manufacturer
  }

  // ======== destroy
  async destroy (request) {
    // only admnistrators can edit a manufacturer
    if (request.token.role !== ROLES.ADMINISTRATOR) throw this.fastify.httpErrors.unauthorized()

    // search
    const manufacturer = await this.manufacturerModel.findByPk(request.params.id)

    // not found
    if (!manufacturer) throw this.fastify.httpErrors.notFound()

    // delete
    await manufacturer.destroy()

    return 'Deleted'
  }

  // ======== list
  async list (request) {
    const { name } = request.query
    const where = {}

    // search by name
    if (name) {
      where.name = { [Op.iLike]: `%${name}%` }
    }

    return this.manufacturerModel.findAll({
      where,
      order: [['name', 'ASC']]
    })
  }
}

module.exports = UserService
