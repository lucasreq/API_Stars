var express = require('express');
var router = express.Router();
const Cards = require('../models/Cards');


/* GET home page. */
router.get('/',function(req,res,next){
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

module.exports = router;
