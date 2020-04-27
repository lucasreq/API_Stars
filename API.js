var express = require('express'); 
var mongoose = require('mongoose');  

var hostname = 'localhost'; 
var port = 3000; 

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };
 
//URL de notre base
var urlmongo = "mongodb+srv://api-stars:starrealms123456@api-stars-hkzdx.gcp.mongodb.net/test?retryWrites=true&w=majority"; 
 
// Nous connectons l'API à notre base de données
mongoose.connect(urlmongo, options);
 
var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'Erreur lors de la connexion')); 
db.once('open', function (){
    console.log("Connexion à la base OK"); 
});

var cardsSchema = mongoose.Schema({
    name: String, 
    faction: String, 
    type: String,
    cost: String, 
    details: String,
    image: String  
}); 
 
var Cards = mongoose.model('Cards', cardsSchema);
 
var app = express(); 

var myRouter = express.Router(); 

var bodyParser = require("body-parser"); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

myRouter.route('/')
// all permet de prendre en charge toutes les méthodes. 
.all(function(req,res){ 
      res.json({message : "All cards ", methode : req.method});
});

myRouter.route('/cards')

// GET
.get(function(req,res){ 
        Cards.find(function(err, cards){
            if (err){
                res.send(err); 
            }
            res.json(cards); 
        }); 
    })
//POST
.post(function(req,res){
    var cards = new Cards();
        cards.name = req.body.name;
        cards.faction = req.body.faction;
        cards.type = req.body.type;
        cards.cost = req.body.cost;
        cards.details = req.body.details;
        cards.image = req.body.image;
        
        cards.save(function(err){
        if(err){
          res.send(err);
        }
        res.send({message : 'Bravo, la carte est maintenant stockée en base de données'});
      })
})

myRouter.route('/cards/:card_id')
.get(function(req,res){ 
    Cards.findById(req.params.card_id, function(err, cards) {
    if (err)
        res.send(err);
    res.json(cards);
});
})
.put(function(req,res){ 
        Cards.findById(req.params.card_id, function(err, cards) {
        if (err){
            res.send(err);
        }
            cards.name = req.body.name;
            cards.faction = req.body.faction;
            cards.type = req.body.type;
            cards.cost = req.body.cost;
            cards.details = req.body.details;
            cards.image = req.body.image; 
            cards.save(function(err){
                if(err){
                    res.send(err);
                }
                res.json({message : 'Bravo, mise à jour des données OK'});
                });                
        });
})
.delete(function(req,res){ 

    Cards.remove({_id: req.params.card_id}, function(err, cards){
    if (err){
        res.send(err); 
    }
    res.json({message:"Bravo, carte supprimée"}); 
}); 

});

app.use(myRouter);  
 
app.listen(port, hostname, function(){
	console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port+"\n"); 
});