'use strict';

let myIo;
const config = require('../config/config');
const symbolCalculator = require('../models/symbolCalculator');
const clear = require('clear');
const Stream = require('twitter-public-stream');

const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();


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

//create stream
startStream(stream);
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

module.exports = (socket, io) => {
    myEmitter.on('symbols', (data) => {
        socket.emit('symbol update', data);
    });

};
