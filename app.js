'use strict'
const Twitter = require('twitter');
const cron = require('cron').CronJob;
require('dotenv').config();

const client = new Twitter({
  consumer_key: process.env.TWITTER_API_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_API_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_API_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_API_ACCESS_TOKEN_SECRET
});

function getHomeTimeLine() {
  client.get('statuses/home_timeline', {}, function (error, tweets, response) {
    if (error) console.log(error);
    console.log(tweets);
  });
}

const cronJob = new cron({
  cronTime: '00 0-59/3 * * * *', // 3分ごとに実行
  start: true, // newした後即時実行するかどうか
  onTick: function() {
    getHomeTimeLine();
  }
});

getHomeTimeLine();