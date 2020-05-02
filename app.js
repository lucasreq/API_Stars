const express = require('express');
const Cards = require('./models/Cards');
//const Sequelize = require('sequelize');

const app = express();

//get All Cards
app.get('/cartes',function(req,res){
    let filter = {};
    let { q } = req.query;

    if (req.query.q){
        filter = {
            where: {
                name: {
                    [Sequelize.Op.like]: `${q}%`
                }
            }
        };
    }

    Cards.findAll().then((cartes)=> {
        res.json(cartes);
    })
})

app.get('/cartes/:id', function(req,res){
    let { id } = req.params;
    Cards.findByPk(id).then((carte) => {
        if (carte){
            res.json(carte);
        } else {
            res.status(404).send();
        }
        
    })
})

app.listen(8000);