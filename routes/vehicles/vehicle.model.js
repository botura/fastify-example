'use strict'

const { DataTypes } = require('sequelize')
const ManufacturerModel = require('./../manufacturers/manufacturer.model')
const UserModel = require('./../users/user.model')

const VehicleModel = (db) => {
  const model = db.define('vehicle', {
    id: {
      field: 'id',
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      field: 'userid',
      type: DataTypes.INTEGER
    },
    manufacturerId: {
      field: 'manufacturerid',
      type: DataTypes.INTEGER
    },
    year: {
      field: 'year',
      type: DataTypes.INTEGER
    },
    price: {
      field: 'price',
      type: DataTypes.DECIMAL
    },
    fisrtOwner: {
      field: 'firstowner',
      type: DataTypes.BOOLEAN
    }
  },
  {
    // Other model options go here
    tableName: 'vehicles',
    timestamps: false
  })

  model.belongsTo(UserModel(db), {
    foreignKey: 'userId'
  })

  model.belongsTo(ManufacturerModel(db), {
    foreignKey: 'manufacturerId'
  })

  return model
}

module.exports = VehicleModel
