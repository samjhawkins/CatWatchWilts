const express = require('express');
const axios = require('axios');

const app = express.Router();
const redirectUri = 'https://localhost:40000';

// Get all cats details
app.get('/', (req, res, next) => {
  console.log('get token');
  const config = {
    headers: {
      Authorization: process.env.BASE64_SECRET,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  console.log('process.env.64', process.env.BASE64_SECRET);
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
      console.log('data', data);
      // res.send({ token: data });
    })
    .catch((e) => {
      console.log('Error translating:', e.message);
      next(e);
    });
});

module.exports = app;
