require('dotenv').config();

const Twit = require('twit');

const T = new Twit({
  consumer_key: process.env.APPLICATION_CONSUMER_KEY,
  consumer_secret: process.env.APPLICATION_CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

const search = { q: ['#KarimBenzema', '#Benzema', '#KB9', '#Nueve'], count: 20, result_type: 'recent' };

// start stream and track tweets
function retweetLatest() {
  try {

    T.get('search/tweets', search, (error, data) => {
      if (error) {
        console.log(error.message);
      } else {

        const id = data.statuses[0].id_str;
        T.post(`statuses/retweet/${id}`, (error, response) => {

          if (error) {
            console.log(error.message);
          } else {
            console.log('Success');
          }

        });
      }
    });

  } catch(e) {
    throw new Error(e)
  }
};

retweetLatest();


//Retweets interval
setInterval(retweetLatest, 1000 * 60 * 10);


