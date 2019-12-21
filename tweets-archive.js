#!/usr/bin/env node

const { resolve } = require('path');
const { writeFileSync } = require('fs');
const axios = require('axios');
const dotenv = require('dotenv').config({
  path: resolve(process.cwd(), '.env'),
});

const data = `${dotenv.parsed.TWITTER_KEY}:${dotenv.parsed.TWITTER_SECRET}`;
const buffData = Buffer.from(data);
const encodedData = buffData.toString('base64');

const dateFmt = date => new Date(date).toISOString();
const getToken = async keys => {
  const authOpts = {
    data: 'grant_type=client_credentials',
    headers: {
      Authorization: `Basic ${keys}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    method: 'POST',
    url: dotenv.parsed.TWITTER_AUTH_URL,
    withCredentials: true,
  };

  const token = await axios(authOpts)
    // eslint-disable-next-line no-console
    .then(result => result.data.access_token)
    .catch(err => console.error(err.response.status, err.response.statusText));

  return token;
};

getToken(encodedData)
  .then(token => {
    const twtOpts = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
      url: dotenv.parsed.TWITTER_TWEETS_URL,
      withCredentials: true,
    };

    axios(twtOpts)
      .then(result => {
        /* eslint-disable sort-keys */
        const cleanTwts = result.data.map(twt => ({
          id: twt.id,
          date: dateFmt(twt.created_at),
          tweet: twt.text,
        }));
        /* eslint-enable */

        writeFileSync(
          resolve(__dirname, 'src/data', 'tweets.json'),
          JSON.stringify(cleanTwts, undefined, 2),
          'utf8'
        );
      })
      .catch(err =>
        console.error(err.response.status, err.response.statusText)
      );
  })
  .catch(err => console.error(err));
