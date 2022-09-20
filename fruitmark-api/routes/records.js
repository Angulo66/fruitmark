const express = require('express');

const recordRoutes = express.Router();

const dbo = require('../db/conn');

/* This is a route that is used to get the fruits and their quantities for all cities. */
recordRoutes.route('/city_fruits').get(async function (_req, res) {
  const dbConnect = dbo.getDb();

  const collection = dbConnect.collection('city_fruits');

  collection
    .find({}, { projection: { _id: 0 } })
    .toArray(function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        const response = result.reduce((acc, cur) => {
          const city = acc.find((item) => item.city === cur.city);
          if (city) {
            city.fruits.push({ fruit: cur.fruit, quantity: cur.quantity });
            city.sum += cur.quantity;
          } else {
            acc.push({
              city: cur.city,
              fruits: [{ fruit: cur.fruit, quantity: cur.quantity }],
              sum: cur.quantity,
            });
          }
          return acc;
        }, []);
        res.status(200).send(response);
      }
    });
});

/* This is a route that is used to get the fruits and their quantities for a specific city. */
recordRoutes.route('/city_fruits/:city').get(async function (req, res) {
  const dbConnect = dbo.getDb();

  const collection = dbConnect.collection('city_fruits');

  collection
    .find({ city: req.params.city }, { projection: { _id: 0, city: 0 } })
    .toArray(function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        const sum = result.reduce((acc, cur) => acc + cur.quantity, 0);
        result.push({ sum });

        const response = {
          city: req.params.city,
          fruits: result,
          sum,
        };

        res.status(200).send(response);
      }
    });
});

/* This is a route that is used to transfer fruits from one city to another. */
recordRoutes.route('/city_fruits/transfer').post(async function (req, res) {
  const dbConnect = dbo.getDb();

  const collection = dbConnect.collection('city_fruits');

  const { cityA, cityB, fruit, quantity } = req.body;

  collection.updateOne(
    { city: cityA, fruit },
    { $inc: { quantity: -quantity } },
    function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        collection.updateOne(
          { city: cityB, fruit },
          { $inc: { quantity } },
          function (err, result) {
            if (err) {
              collection.updateOne(
                { city: cityA, fruit },
                { $inc: { quantity } },
                function (err, result) {
                  if (err) {
                    res.status(500).send(err);
                  }
                }
              );
              res.status(500).send(err);
            } else {
              res.status(200).send(result);
            }
          }
        );
      }
    }
  );
});

module.exports = recordRoutes;
