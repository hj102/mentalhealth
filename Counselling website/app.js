var express = require('express');
var path = require('path');
var app=express();
var bodyParser = require('body-parser');
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000,function(){
    console.log("3000");
});
//this is added by local git


