const express = require('express');
const axios = require('axios');
const logger = require('../src/utils/logger');

const app = express.Router();
const redirectUri = 'https://cw.coilar.com';

// Get token
app.get('/', (req, res, next) => {
  logger('Get token');
  const config = {
    headers: {
      Authorization: process.env.BASE64_SECRET,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  const params = new URLSearchParams();
  params.append('code', req.query.code);
  params.append('grant_type', 'authorization_code');
  params.append('redirect_uri', redirectUri);
  params.append('client_id', process.env.CLIENT_ID);
  // params.append('scope', 'all');
  axios
    .post(
      'https://catwatch.auth.eu-west-2.amazoncognito.com/oauth2/token',
      params,
      config,
    )
    .then((data) => {
      logger('Token returning...');
      res.send({ token: data.data.access_token });
    })
    .catch((e) => {
      logger('Error translating:', e.message);
      next(e);
    });
});

module.exports = app;
