var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var server = require('http').Server(app)
var io = require('socket.io')(server)

var sockets = []

var jsonParser = bodyParser.json()
var notifications = []

app.get('/notifications', function(req, res){
    res.send(JSON.stringify(notifications))
});

app.post('/notifications', jsonParser, function(req, res){
    notification = req.body
    notifications.push(notification)
    for(var i=0; i<sockets.length; ++i) {
        sockets[i].emit('event')
    }
    return res.sendStatus(200)
});

app.use('/dashboard', express.static(__dirname + '/html'))

io.on('connection', function (socket) {
    sockets.push(socket)
})

server.listen(3000)