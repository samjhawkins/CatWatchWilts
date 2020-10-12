const express = require('express');

const app = express.Router();
const aws = require('aws-sdk');

aws.config.update({ region: 'eu-west-2' });
const ddb = new aws.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const TableName = 'Cats';

// Write new cat to database
app.post('/cats/:id', async (req, res) => {
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

  try {
    const data = await ddb.putItem(params).promise();
    res.send({ data });
  } catch (error) {
    console.error(error);
  }
});

// Get all cats details
app.get('/cats', async (req, res) => {
  console.log('get all');
  const params = {
    TableName,
  };
  try {
    const { Items } = await ddb.scan(params).promise();
    res.send({ data: Items });
  } catch (error) {
    console.error(error);
  }
});

module.exports = app;
