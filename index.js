require('dotenv').config();

const Twit = require('twit');

const T = new Twit({
  consumer_key: process.env.APPLICATION_CONSUMER_KEY,
  consumer_secret: process.env.APPLICATION_CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

// start stream and track tweets
const stream = T.stream('statuses/filter', { track: '#KarimBenzema', track: '#Benzema', track: '#KB9'});

function responseCallback(err, data, response) {
  console.log(err);
};

stream.on('tweet', tweet => {
  // retweet
  T.post('statuses/retweet/:id', { id: tweet.id_str }, responseCallback);
  // like
  T.post('favorites/create', { id: tweet.id_str }, responseCallback);
});
