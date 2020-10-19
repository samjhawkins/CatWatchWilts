const express = require('express');
const assert = require('assert');

const app = express.Router();
const aws = require('aws-sdk');

aws.config.update({ region: 'eu-west-2' });
const ddb = new aws.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const TableName = 'Cats';

const newOrUpdate = (oldArray, catId) => async (sentInRecord) => {
  // If we cannot find senInRecord in oldArray, add it,
  // otherwise check for updates
  const searchForImage = oldArray.find(
    (image) => image.imageId === oldArray.imageId,
  );
  if (searchForImage === undefined) {
    return ddb
      .put({
        TableName: 'CatImages',
        Item: {
          catId,
          image: sentInRecord.image,
          imageName: sentInRecord.imageName,
          imageId: sentInRecord.imageId,
        },
      })
      .promise();
  }
  if (!assert.deepStrictEqual(sentInRecord, searchForImage)) {
    await ddb
      .update({
        TableName,
        Key: {
          imageId: sentInRecord.imageId,
          catId,
        },
        UpdateExpression: `set image = :image, imageName = :imageName`,
        ExpressionAttributeValues: {
          ':image': sentInRecord.image,
          ':imageName': sentInRecord.imageName,
        },
      })
      .promise();
  }
  return Promise.resolve();
};
const deleteMissing = (sentInArray) => async (oldArrayItem) => {
  // If we cannot find oldArrayItem in sentInArray, delete it
  const searchForImage = sentInArray.find(
    (image) => image.imageId === oldArrayItem.imageId,
  );
  if (searchForImage === undefined) {
    return ddb
      .delete({
        TableName: 'CatImages',
        Key: {
          catId: oldArrayItem.catId,
          imageId: oldArrayItem.imageId,
        },
      })
      .promise();
  }
  return Promise.resolve();
};

// Write new cat to database
app.put('/cats/:id', async (req, res) => {
  console.log('edit cat on id', req.params.id);

  try {
    // Check if cat exists
    let exists = false;
    const { Item } = await ddb
      .get({
        TableName,
        Key: {
          id: req.params.id,
        },
        AttributesToGet: ['id'],
      })
      .promise();
    if (Item !== undefined && Item !== null) {
      exists = true;
    }

    if (exists) {
      // Update db
      await ddb
        .update({
          TableName,
          Key: {
            id: req.params.id,
          },
          UpdateExpression: `set #n = :name, image = :image, active = :active, age = :age, description = :description`,
          ExpressionAttributeValues: {
            ':name': req.body.name,
            ':image': req.body.image,
            ':active': req.body.active,
            ':age': req.body.age,
            ':description': req.body.description,
          },
          ExpressionAttributeNames: {
            '#n': 'name',
          },
        })
        .promise();
    } else {
      // Add to db
      await ddb
        .put({
          TableName,
          Item: {
            id: req.body.id,
            name: req.body.name,
            image: req.body.image,
            active: req.body.active,
            age: req.body.age,
            description: req.body.description,
          },
        })
        .promise();
    }

    // Get existing images
    const { Items: imageItems } = await ddb
      .scan({ TableName: 'CatImages' })
      .promise();

    // Filter Images to current cat
    const filteredImages = imageItems.filter(
      (imageRecord) => imageRecord.catId === req.params.id,
    );

    // Now, loop through images sent in, compare to scan,
    // any new get added,
    // any matches get updated,
    // any not found get deleted,

    // Evaluate new images coming in
    await Promise.all([
      ...req.body.imageArray.map(newOrUpdate(filteredImages, req.params.id)),
      ...filteredImages.map(deleteMissing(req.body.imageArray)),
    ]);

    res.send({ status: 200, message: 'ok' });
  } catch (error) {
    console.error(error);
    throw new Error('There was an error on the server');
  }
});

app.delete('/cats/:id', async (req, res) => {
  console.log('Deleting cat:', req.params.id);
  try {
    // Get existing images
    const { Items: imageItems } = await ddb
      .scan({ TableName: 'CatImages' })
      .promise();

    // Filter Images to current cat
    const filteredImages = imageItems.filter(
      (imageRecord) => imageRecord.catId === req.params.id,
    );

    console.log('filteredImages', filteredImages);

    // Delete all images
    await Promise.all(
      filteredImages.map((arrayItem) => {
        console.log('arrayItem', arrayItem);
        return ddb
          .delete({
            TableName: 'CatImages',
            Key: {
              catId: arrayItem.catId,
              imageId: arrayItem.imageId,
            },
          })
          .promise();
      }),
    );

    console.log('deleted all images successfully');

    // Delete cat
    await ddb
      .delete({
        TableName,
        Key: {
          id: req.params.id,
        },
      })
      .promise();

    console.log('deleted cat');

    res.send({ status: 200, message: 'ok' });
  } catch (error) {
    console.error(error);
    throw new Error('There was an error on the server');
  }
});

// Get all cats details
app.get('/cats', async (req, res) => {
  console.log('get all');
  const params = {
    TableName,
  };
  try {
    // Get all cats
    const { Items: catItems } = await ddb.scan(params).promise();

    // Get all images
    const { Items: imageItems } = await ddb
      .scan({ TableName: 'CatImages' })
      .promise();

    // Map images to cats
    const returnCats = catItems.map((cat) => {
      return {
        ...cat,
        imageArray: imageItems.filter((catImage) => catImage.catId === cat.id),
      };
    });

    // Return mapped cats
    res.send({ data: returnCats });
  } catch (error) {
    console.error(error);
    throw new Error('There was an error on the server');
  }
});

module.exports = app;
