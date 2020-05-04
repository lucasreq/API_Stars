let express = require('express');
let router = express.Router();
const Cards = require('../models/Cards');

/* GET home page. */
router.get('/',function(req,res){
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
      res.render("index", {title:"starRealms", cartes });
  })
})

module.exports = router;
