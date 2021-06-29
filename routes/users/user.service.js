'use strict'

const { Op } = require('sequelize')
const { ROLES } = require('../../common/roles')
const UserModel = require('./user.model')

class UserService {
  constructor (fastify) {
    this.fastify = fastify
    this.userModel = UserModel(fastify.sequelize)
  }

  // ======== login
  async login (request) {
    const { email, password } = request.body

    const where = {
      email,
      password
    }
    return await this.userModel.findOne({ where })
  }

  // ======== add
  async add (request) {
    const user = await this.userModel.create(request.body)
    return user
  }

  // ======== edit
  async edit (request) {
    // user can edit only himself
    if (request.token.id !== request.params.id) throw this.fastify.httpErrors.unauthorized()

    // search
    const user = await this.userModel.findByPk(request.params.id)

    // not found
    if (!user) throw this.fastify.httpErrors.notFound()

    // update
    for (const prop in request.body) {
      user[prop] = request.body[prop]
    }
    await user.save()

    return user
  }

  // ======== destroy
  async destroy (request) {
    // user can delete only himself, excepected he is a 'administrator'
    if (request.token.id !== request.params.id &&
      request.token.role !== ROLES.ADMINISTRATOR) throw this.fastify.httpErrors.unauthorized()

    // search
    const user = await this.userModel.findByPk(request.params.id)

    // not found
    if (!user) throw this.fastify.httpErrors.notFound()

    // delete
    await user.destroy()

    return 'Deleted'
  }

  // ======== list
  async list (request) {
    const { name, email, birthMonth } = request.query
    const where = {}

    // search by name
    if (name) {
      where.name = { [Op.iLike]: `%${name}%` }
    }

    // search by email
    if (email) {
      where.email = { [Op.iLike]: `%${email}%` }
    }

    // search by birth month
    if (birthMonth) {
      where.birthday = { [Op.and]: [this.fastify.sequelize.literal('EXTRACT(MONTH FROM birthday) = :birthMonth')] }
    }

    return this.userModel.findAll({
      where,
      replacements: {
        birthMonth
      },
      order: [['name', 'ASC']]
    })
  }
}

module.exports = UserService
