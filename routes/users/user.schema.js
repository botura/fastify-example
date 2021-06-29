'use strict'

const S = require('fluent-json-schema')
const { SWAGGER_TAGS } = require('../../common/swaggerTags')
const { ROLES } = require('../../common/roles')

const tags = [SWAGGER_TAGS.USERS.name]

const addSchema = {
  tags,
  summary: 'Add user',
  body: S.object()
    .prop('birthday', S.string().format('date').required())
    .prop('email', S.string().format(S.FORMATS.EMAIL).required())
    .prop('name', S.string().maxLength(60).required())
    .prop('password', S.string().minLength(4).maxLength(20).required())
    .prop('role', S.string().enum(Object.values(ROLES)).default(ROLES.VISITOR))
}

const editSchema = {
  tags,
  summary: 'Edit user',
  params: S.object()
    .prop('id', S.integer().minimum(1).required()),
  body: S.object()
    .prop('birthday', S.string().format('date').required())
    .prop('email', S.string().format(S.FORMATS.EMAIL).required())
    .prop('name', S.string().maxLength(60).required())
    .prop('password', S.string().minLength(4).maxLength(20).required())
    .prop('role', S.string().enum(Object.values(ROLES)).default(ROLES.VISITOR))
}

const deleteSchema = {
  tags,
  summary: 'Delete user',
  params: S.object()
    .prop('id', S.integer().minimum(1).required())
}

const loginSchema = {
  tags,
  summary: 'Login user',
  body: S.object()
    .prop('email', S.string().format(S.FORMATS.EMAIL).required())
    .prop('password', S.string().minLength(4).required())
}

const verifyTokenSchema = {
  tags,
  summary: 'Verify token'
}

const listSchema = {
  tags,
  summary: 'List users',
  query: S.object()
    .prop('email', S.string())
    .prop('name', S.string())
    .prop('birthMonth', S.integer().minimum(1).maximum(12)),
  response: {
    200: S.array().items(
      S.object()
        .prop('birthday', S.string().required())
        .prop('email', S.string())
        .prop('id', S.integer().required())
        .prop('name', S.string())
    )
  }
}

module.exports = {
  addSchema,
  editSchema,
  deleteSchema,
  listSchema,
  loginSchema,
  verifyTokenSchema
}
