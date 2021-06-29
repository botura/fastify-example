'use strict'

const S = require('fluent-json-schema')
const { SWAGGER_TAGS } = require('../../common/swaggerTags')

const tags = [SWAGGER_TAGS.VEHICLE.name]

const addSchema = {
  tags,
  summary: 'Add vehicle',
  body: S.object()
    // .prop('userId', S.integer().minimum(1).required())
    .prop('manufacturerId', S.integer().minimum(1).required())
    .prop('year', S.integer().minimum(1900))
    .prop('price', S.number())
    .prop('fisrtOwner', S.boolean().default(false))
}

const editSchema = {
  tags,
  summary: 'Edit vehicle',
  params: S.object()
    .prop('id', S.integer().minimum(1).required()),
  body: S.object()
    .prop('userId', S.integer().minimum(1).required())
    .prop('manufacturerId', S.integer().minimum(1).required())
    .prop('year', S.integer().minimum(1900))
    .prop('price', S.number())
    .prop('fisrtOwner', S.boolean().default(false))
}

const deleteSchema = {
  tags,
  summary: 'Delete vehicle',
  params: S.object()
    .prop('id', S.integer().minimum(1).required())
}

const byPkSchema = {
  tags,
  summary: 'Get one vehicle',
  params: S.object()
    .prop('id', S.integer().minimum(1).required()),
  response: {
    200: S.object()
      .prop('id', S.integer())
      .prop('userId', S.integer())
      .prop('manufacturerId', S.integer())
      .prop('year', S.integer())
      .prop('price', S.number())
      .prop('firstOwner', S.boolean())
      .definition('manufacturer', S.object()
        .id('#manufacturer')
        .prop('name', S.string()))
      .prop('manufacturer', S.ref('#manufacturer'))
      .definition('user', S.object()
        .id('#user')
        .prop('name', S.string())
        .prop('email', S.string()))
      .prop('user', S.ref('#user'))
  }
}

const listSchema = {
  tags,
  summary: 'Get vehicles list',
  query: S.object()
    .prop('id', S.string())
    .prop('userId', S.string())
    .prop('manufacturerId', S.string())
    .prop('year', S.integer())
    .prop('username', S.string()),
  response: {
    200: S.array().items(
      S.object()
        .prop('id', S.integer())
        .prop('userId', S.integer())
        .prop('manufacturerId', S.integer())
        .prop('year', S.integer())
        .prop('price', S.number())
        .prop('firstOwner', S.boolean())
        .definition('manufacturer', S.object()
          .id('#manufacturer')
          .prop('name', S.string()))
        .prop('manufacturer', S.ref('#manufacturer'))
        .definition('user', S.object()
          .id('#user')
          .prop('name', S.string())
          .prop('email', S.string()))
        .prop('user', S.ref('#user'))
    )
  }
}

module.exports = {
  addSchema,
  editSchema,
  deleteSchema,
  byPkSchema,
  listSchema
}
