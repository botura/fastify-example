'use strict'

const { DataTypes } = require('sequelize')

const UserModel = (db) => {
  const model = db.define('user', {
    id: {
      field: 'id',
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      field: 'email',
      type: DataTypes.STRING
    },
    password: {
      field: 'password',
      type: DataTypes.STRING
    },
    name: {
      field: 'name',
      type: DataTypes.STRING
    },
    birthday: {
      field: 'birthday',
      type: DataTypes.DATEONLY
    },
    role: {
      field: 'role',
      type: DataTypes.STRING
    }
  },
  {
    // Other model options go here
    tableName: 'users',
    timestamps: false
  })

  return model
}

module.exports = UserModel
