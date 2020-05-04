let express = require('express');
let router = express.Router();
const Cards = require('../models/Cards');
let bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



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
      res.json(cartes);
  })
})

module.exports = router;
