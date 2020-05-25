const aws = require('aws-sdk');

aws.config.update({ region: 'REGION' });
const ddb = new aws.DynamoDB({ apiVersion: '2012-08-10' });
const TableName = 'Cats';

module.exports = (app) => {
  // overwrite the people taking part
  app.post('/cats/:id', function (req, res) {
    console.log('id', req.params.id);
    const params = {
      TableName,
      Item: {
        id: { S: req.params.id },
      },
    };
    const response = ddb.putItem(params, function (err, data) {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('Success', data);
      }
    });
    res.send({ data: response });
  });

  // get list of all the people taking part
  app.get('/cats', function (req, res) {
    const cats = [{}];
    res.send({ data: cats });
  });

  // get specific cat details
  app.get('/cats/:id', function (req, res) {
    const cat = { id: req.params.id };
    res.send({ data: cat });
  });

  return app;
};
