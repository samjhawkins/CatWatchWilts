const express = require('express');

const app = express.Router();
const aws = require('aws-sdk');

aws.config.update({ region: 'eu-west-2' });
const ddb = new aws.DynamoDB({ apiVersion: '2012-08-10' });
const TableName = 'Cats';

// Write new cat to database
app.post('/cats/:id', function (req, res) {
  console.log('id', req.params.id);
  const params = {
    TableName,
    Item: {
      id: { S: req.params.id },
      name: { S: req.body.name },
      image: { S: req.body.image },
      active: { S: req.body.active },
      age: { S: req.body.age },
      description: { S: req.body.description },
      imageName: { S: req.body.imageName },
    },
  };
  const response = ddb.putItem(params, function (err, data) {
    if (err) {
      console.log('Error', err);
      return err;
    }
    console.log('Success', data);
    return data;
  });
  res.send({ data: response });
});

// Get all cats details
app.get('/cats', function (req, res) {
  console.log('get all');
  const params = {
    TableName,
  };
  const cats = ddb.scan(params, function (err, data) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Success', data.Items);
    }
  });
  res.send({ data: cats });
});

// Get specific cat details
app.get('/cats/:id', function (req, res) {
  console.log('get cat', req.params.id);
  const params = {
    TableName,
    Key: {
      id: { S: req.params.id },
    },
  };
  const cat = ddb.getItem(params, function (err, data) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Success', data.Item);
    }
  });
  res.send({ data: cat });
});

module.exports = app;
