const compression = require('compression');
const bodyParser = require('body-parser');
const { MongoStore } = require('./mongo');
const express = require('express');
const path = require('path');

(async () => {
  const mongoStore = await new MongoStore().connect();

  const app = express();

  app.enable('strict routing');
  app.enable('trust proxy');

  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'html')));

  app.post('/update', (req, res) => {
    console.log('updated', req.body);
    return res.json({});
  });

  app.use('/', (req, res) => {
    return res.sendFile(path.join(__dirname, 'html/index.html'));
  });

  app.listen(process.env.PORT || 8080, () => {
    console.log(`Servering on ${process.env.PORT || 8080}`);
  });
})();
