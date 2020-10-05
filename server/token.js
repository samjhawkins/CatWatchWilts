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
  console.log('req.params.code', req.params.code);
  // eslint-disable-next-line no-useless-catch
  axios
    .post(
      'https://catwatch.auth.eu-west-2.amazoncognito.com/oauth2/token',
      `code=${req.params.code}&grant_type=authorization_code&redirect_uri=${redirectUri}&client_id=${process.env.CLIENT_ID}&scope=all`,
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
