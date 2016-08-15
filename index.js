var express = require('express');
var bodyParser = require('body-parser')

var app = express();
var jsonParser = bodyParser.json()
var notifications = []

app.get('/notifications', function(req, res){
  res.send(JSON.stringify(notifications));
});

app.post('/notifications', jsonParser, function(req, res){
  notification = req.body
  notifications.push(notification)
  return res.sendStatus(200)
});

app.listen(3000);