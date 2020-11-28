const http = require ('http');
const express= require ('express');
const bodyParser = require("body-parser");
const fs = require('fs');
const app = express();
const products = require ('./products.json');
const category = require ('./category.json');
const cart = require ('./cart.json');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
    app.options('*', (req, res) => {
        // allowed XHR methods  
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
app.get('/', function (req,res){
res.sendFile(__dirname + '/index.html')
});
app.get('/products/1.0', function(req , res){
    res.json(products);
});
app.get('/category/1.0', function(req , res){
    res.json(category);
});
app.get('/cart/1.0', function(req , res){
    res.json(cart);
});

app.post('/cartPost',(req, res) => {
    var name = req.body.user;
    var count = req.body.count;
    var unitCost = req.body.unitCost;
    var currency = req.body.currency;
    var src = req.body.src;
    
    var stream = fs.createWriteStream("./carrito/"+req.body.user+""+req.body.count+""+req.body.unitCost+""+req.body.currency+""+req.body.src+".json");
    stream.once('open', function(fd) {
    stream.write(JSON.stringify(req.body));
    stream.end(); });
    res.end("yes");
  });

const servidor= http.createServer(app);
const puerto=80;
servidor.listen(80);
console.debug('funciona en mi puertito ' + puerto);

