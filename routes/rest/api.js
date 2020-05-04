var express = require('express');

const Cards = require('../../models/Cards');

var route = express.Router();



//get Cards by Id
route.get('/cartes/:id', function(req,res){
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
route.post("/cartes", (req, res) => 
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
route.delete('/cartes/:id', function (req, res) {
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
route.put('cartes/:id', function (req, res) {
 
    const id = req.params.id;
 
    const { name,type,faction,details,image } = req.body;
 
    Cards.update({
            name: name,
            type: type,
            faction: faction,
            details: details,
            image: image,
            updatedAt: date.now()
        }, {
            where: {
                id: id
            }
        })
        .then(status => res.json({
            error: false,
            message: 'cards has been updated.'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
});

module.exports = route;
