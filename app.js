'use strict'
var express = require('express');
var app = express();
var path = require("path");
var fs = require('fs');
var bodyParser = require('body-parser');
var data = JSON.parse(fs.readFileSync('options.json'));

/* {
  "prensa": false,
  "correo": false,
  "television": false,
  "vallas": false,
  "folletos": false,
  "radio": false,
  "internet": false,
  "otro": false,
  "producto": true,
  "rating": 4
} */

app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/css'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
    res.json(data);
});

app.listen(3000, function() {
  console.log('###########################################################################');
  console.log('#       Asignatura: Tecnologías Emergentes.                               #');
  console.log('#       Curso: Tercero                                                    #');
  console.log('#       Proyecto: WEB push.                                               #');
  console.log('#       ALUMNO: Carlos Escario Bajo                                       #');
  console.log('###########################################################################');
  console.log('Project app listening on port 3000!');
	require("openurl").open("http://localhost:3000/");
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.post('/', function(req, res) {
	data.prensa = req.body.prensa?toBoolean(req.body.prensa):false;
	data.correo = req.body.correo?toBoolean(req.body.correo):false;
	data.television = req.body.television?toBoolean(req.body.television):false;
	data.vallas = req.body.vallas?toBoolean(req.body.vallas):false;
	data.folletos = req.body.folletos?toBoolean(req.body.folletos):false;
	data.radio = req.body.radio?toBoolean(req.body.radio):false;
	data.internet = req.body.internet?toBoolean(req.body.internet):false;
	data.otro = req.body.otro?toBoolean(req.body.otro):false;
    data.producto = req.body.producto;
    data.rating = req.body.rating;
    fs.writeFile('options.json', JSON.stringify(data, null, 2), end);
	res.sendFile(path.join(__dirname + '/index.html'));
});

function toBoolean(value){
	return (value==="true")?true:false;
}

function end(err){
	err?console.log(err):console.log('End transaction');
}

module.exports = app;
