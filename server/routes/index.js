'use strict';

const config = require('../config/config');
const router = require('express').Router();
const SymbolCalculator = require('../models/symbolCalculator');
const SymbolCollector = require('../models/symbolCollector');
const OAuth = require('oauth');
const path = require('path');

const oauth = new OAuth.OAuth(
     'https://api.twitter.com/oauth/request_token',
     'https://api.twitter.com/oauth/access_token',
     /* jshint ignore:start */
     config.twitterMyMood.consumer_key,
     config.twitterMyMood.consumer_secret,
     /* jshint ignore:end */
     '1.0A',
     null,
     'HMAC-SHA1'
   );

router.get('/userMood/:name', (req, res) => {
    oauth.get(
      `https://api.twitter.com/1.1/statuses/user_timeline.json?count=800&trim_user=true&include_rts=false&screen_name=${req.params.name}`,
      /* jshint ignore:start */
      config.twitterMyMood.access_token_key,
      config.twitterMyMood.access_token_secret,
      /* jshint ignore:end */
      (e, data, ress) => {
        if(e){
            return res.json({
                error: 'User not found'
            });
        }
        const symbolCalculator = new SymbolCalculator();
        const symbolCollector = new SymbolCollector();
        const parsedData = JSON.parse(data);

        parsedData
            .map(a => a.text)
            .forEach(a => symbolCollector.add(
                symbolCalculator.getMostUsedSymbol(a)));
        const usedSymbols = symbolCollector.getCollectionSorted();
        const nrOfTweetsCounted = symbolCalculator.getCounted();

        res.json({
            symbols: usedSymbols,
            nrOfTweets: nrOfTweetsCounted
        });

      });
});

router.get('/twitterUserMood', (req, res) => {
    res.sendFile( path.join(__dirname, '../public/index.html'));
});

module.exports = router;
