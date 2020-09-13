const express = require('express');
const axios = require('../src/components/common/axiosInstance');

const app = express.Router();
const redirectUri = 'https://localhost:40000';

// Get all cats details
app.get('/token', (req, res) => {
  console.log('get token');
  const config = {
    headers: {
      Authorization: process.env.BASE64_SECRET,
    },
  };
  console.log('process.env.64', process.env.BASE64_SECRET);
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
      console.log('Error translating:', e);
      res.error(new Error('There was a problem verifying the code'));
    });
});

module.exports = app;
