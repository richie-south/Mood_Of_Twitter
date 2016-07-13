'use strict';

const config = require('../config/config');
const symbolCalculator = require('../models/symbolCalculator');
const clear = require('clear');
const Stream = require('twitter-public-stream');

const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
let isStreamOn = false;

const stream = new Stream({
    /* jshint ignore:start */
    consumer_key: config.twitter.consumer_key,
    consumer_secret: config.twitter.consumer_secret,
    access_token_key: config.twitter.access_token_key,
    access_token_secret: config.twitter.access_token_secret,
	track: config.twitter.track
    /* jshint ignore:end */
});

const startStream = (stream) => {
    stream.stream();
};

const stopStream = (stream) => {
    stream.destroy();
};

let symbolCounter = symbolCalculator.symbolCounter();
stream.on('data', (json) => {

    symbolCounter(json.text);
    const usedSymbols = symbolCalculator.getUsedSymbols();
    const nrOfTweetsCounted = symbolCalculator.getNumberOfTweetsCalculated();

    myEmitter.emit('symbols', {
        symbols: usedSymbols,
        nrOfTweets: nrOfTweetsCounted
    });
});

stream.on('connected', () => {
    isStreamOn = true;
});

stream.on('close', () => {
    isStreamOn = false;
});

const doStream = (clients) => {
    if(clients === 0){
        stopStream(stream);
    }else if(clients > 0 && !isStreamOn){
        startStream(stream);
    }
};

module.exports = (socket, io) => {
    doStream(io.engine.clientsCount);

    myEmitter.on('symbols', (data) => {
        socket.emit('symbol update', data);
    });

    socket.on('disconnect', function() {
      console.log('Got disconnect!');
      doStream(io.engine.clientsCount);
   });
};
