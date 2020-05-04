// const sequelize = require('../database/config');
// const Sequelize = require('sequelize')

// module.exports = sequelize.define("cartes", {
//     id: {
//         field: 'id',
//         type: Sequelize.INTEGER,
//         primaryKey: true
//     },
//     name: {
//         field: 'name',
//         type: Sequelize.STRING,
//     },
//     type: {
//         field: 'type',
//         type: Sequelize.STRING,
//     },
//     faction: {
//         field: 'faction',
//         type: Sequelize.STRING,
//     },
//     cost: {
//         field: 'cost',
//         type: Sequelize.INTEGER,
//     },
//     details: {
//         field: 'details',
//         type: Sequelize.STRING,
//     }
// })

const { Sequelize, Model, DataTypes, destroy } = require("sequelize");
const db = require('../database/config');

module.exports = db.define("cartes", {
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    type : DataTypes.INTEGER,
    faction : DataTypes.STRING,
    cost : DataTypes.INTEGER,
    details : DataTypes.TEXT,
    
});

// (async () => {
//     await db.sync({ force: true });
// })();

// function addCard(name,type,faction,cost,details) {
//     const card = Carte.create({name: {name},type: {type}, faction: {faction}, cost: {cost}, details: {details}});
//     console.log(card.name);
// }

// function deleteCard(name) {
//     Carte.destroy(`'name' LIKE ${name}`).success();
// }