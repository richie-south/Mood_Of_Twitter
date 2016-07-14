'use strict';

var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
    const clear = require('clear');
    clear();
    clear();
}

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('express').Router();

const port = 9090;
server.listen(port, function(){
    console.log('Listening on port ', port);
});

app.set('views', path.join(__dirname,'/public'));
app.set('json spaces', 2);
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use('/', router);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
});

app.use('/', require('./routes/index'));

app.use(function(req, res, next) {
    res.status(404).send('404');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('500');
});

const onConection = require('./socketRoutes/onConection');

io.on('connection', (socket) => {
    console.log('connected');
    onConection(socket, io);
});
