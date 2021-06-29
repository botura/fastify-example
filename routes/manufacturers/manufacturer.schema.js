'use strict'

const S = require('fluent-json-schema')
const { SWAGGER_TAGS } = require('../../common/swaggerTags')

const tags = [SWAGGER_TAGS.MANUFACTURER.name]

const addSchema = {
  tags,
  summary: 'Add manufacturer',
  body: S.object()
    .prop('name', S.string().maxLength(60).required())
}

const editSchema = {
  tags,
  summary: 'Edit manufacturer',
  params: S.object()
    .prop('id', S.integer().minimum(1).required()),
  body: S.object()
    .prop('name', S.string().maxLength(60).required())
}

const deleteSchema = {
  tags,
  summary: 'Delete manufacturer',
  params: S.object()
    .prop('id', S.integer().minimum(1).required())
}

const listSchema = {
  tags,
  summary: 'List manufacturer',
  query: S.object()
    .prop('name', S.string()),
  response: {
    200: S.array().items(
      S.object()
        .prop('id', S.integer().required())
        .prop('name', S.string())
    )
  }
}

module.exports = {
  addSchema,
  editSchema,
  deleteSchema,
  listSchema
}
