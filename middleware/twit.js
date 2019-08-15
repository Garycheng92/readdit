
var Twit = require('twit')
var config = require('config');


module.exports = function(req, res, next) {
var T = new Twit({
  consumer_key:         config.get('twitterClientId'),
  consumer_secret:      config.get('twitterSecret'),
  access_token:         config.get('twitterToken'),
  access_token_secret:  config.get('twitterTokenSecret'),
});

    T.get(`statuses/user_timeline`, {screen_name: req.params.username, count: 5, include_rts: false, exclude_replies: true},
    async (err, data, response) => {
      try{
      if (response.statusCode !== 200) {
       return res.status(404).json({msg: 'No Twitter Account Found'})
      }

        res.json(data)
      }
      catch (err) {
        console.error(err);
        res.status(500).send('Server Error')
      }
    });
  }