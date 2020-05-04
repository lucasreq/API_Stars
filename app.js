const express = require('express');
const Cards = require('./models/Cards');
//const Sequelize = require('sequelize');

const app = express();

//get All Cards
app.get('/',function(req,res){
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

//get Cards by Id
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

//create Cards
app.post("/cartes", (req, res) => 
    Cards.create({
        name: req.body.name,
        type: req.body.type,
        faction: req.body.faction,
        cost: req.body.cost,
        details: req.body.details,
        createdAt: Date.now()
    }).then( (result) => res.json(result) )
  );

//delete a Card
app.delete('/cartes/:id', function (req, res) {
    let { id } = req.params;

    Cards.destroy({ where: {
        id: id
    }})
        .then(status => res.json({
            error: false,
            message: 'todo has been delete.'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
    });


//update Cards
app.put('/cartes/:id', function (req, res) {
    let { id } = req.params;
    const { title, description } = req.body;
    
    Cards.update({
            title: title,
            description: description
        }, {
            where: {
                id: id
            }
        })
        .then(cartes => res.json({
            error: false,
            message: 'todo has been updated.'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
    });



app.listen(8000);