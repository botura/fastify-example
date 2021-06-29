'use strict'

const { DataTypes } = require('sequelize')

const ManufacturerModel = (db) => {
  const model = db.define('manufacturer', {
    id: {
      field: 'id',
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      field: 'name',
      type: DataTypes.STRING
    }
  },
  {
    // Other model options go here
    tableName: 'manufacturers',
    timestamps: false
  })

  return model
}

module.exports = ManufacturerModel
