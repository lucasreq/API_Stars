

const sequelize = require('../database/config');
const Sequelize = require('sequelize')

module.exports = sequelize.define("cartes", {
    id: {
        field: 'id',
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        field: 'name',
        type: Sequelize.STRING,
    },
    type: {
        field: 'type',
        type: Sequelize.STRING,
    },
    faction: {
        field: 'faction',
        type: Sequelize.STRING,
    },
    cost: {
        field: 'cost',
        type: Sequelize.INTEGER,
    },
    details: {
        field: 'details',
        type: Sequelize.STRING,
    }
})