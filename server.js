var express = require('express');
var fs = require('fs');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
server.listen(3000);

app.use("/bower_components", express.static(__dirname + '/bower_components'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/css", express.static(__dirname + '/css'));

var outputFile = function(filename, req, res){
    fs.readFile(
        __dirname + filename,
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading file');
            }

            res.writeHead(200);
            res.end(data);
        }
    );
};

app.get('/results', function(req, res){
    outputFile('/results.html', req, res);
});

app.get('/', function(req, res){
    outputFile('/client.html', req, res);
});

io.sockets.on('connection', function(socket){
    socket.emit('news', { hello: 'world' })
    socket.on('tap', function(data){
        console.log(data);
        io.sockets.emit('tap', data);
    });
});