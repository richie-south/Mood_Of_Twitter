'use strict';
const items = ['😄','😃','😀','😊','😍','😘','😚','😝','😛','😳','😢','😂','😭','😪','😥','😰','😅','😓','😨','😱','😡','😆','😋','😎','😴','😵','😲','😮','😬','😇','😏','💩','😴','👍','👎','👌','👊','❤','💔','💋','👌','🙊','😶','😕','😐','😑','✌','👀','👼'];
const config = {
    items,
    /* jshint ignore:start */
    twitter: {

        consumer_key: '',
        consumer_secret: '',
        access_token_key: '',
        access_token_secret: '',
    	track: items.join()
    },

    twitterMyMood: {
        consumer_key: '',
        consumer_secret: '',
        access_token_key: '',
        access_token_secret: '',
    }
    /* jshint ignore:end */
};


module.exports = config;
