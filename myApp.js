var express = require('express');
var app = express();
var bodyParser = require('body-parser')

console.log('Hello Word')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// middleware logger
app.use(function(req, res, next){
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
})

//Chained Middleware
app.get('/now', function(req, res, next){
    req.time = new Date().toString();
    next();
}, function(req, res){
    res.send({time: req.time})
})

//Read (GET) and send a file to the server(HTML)
absolutePath = __dirname + '/views/index.html'

app.get('/', function(req, res){
    res.sendFile(absolutePath);
})

//Serve static files
app.use('/public',express.static(__dirname + '/public'))

//Get a json and puts it in /json
app.get('/json', function(req, res){
    if(process.env.MESSAGE_STYLE === "uppercase"){
        res.json({"message": "HELLO JSON"})
    }else{
        res.json({"message": "Hello json" })
    }
})

//Echo server 
app.get('/:word/echo',(req, res) => {
    res.json({echo: req.params.word})
})

//API endpoint with encoded params

app.get('/name', (req, res) =>{
    var firstname = req.query.first
    var lastname = req.query.last
    res.json({name: firstname + ' ' + lastname})
})

app.post('/name', (req, res) => {
    var firstname = req.body.first
    var lastname = req.body.last
    res.json({name: firstname + ' ' + lastname})
})





module.exports = app;
