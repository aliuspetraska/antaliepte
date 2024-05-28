const compression = require('compression');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const app = express();

app.enable('strict routing');
app.enable('trust proxy');

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.post('/update', (req, res) => {
    console.log('updated', req.body);
});

app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/index.html'));
});

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Servering on ${PORT}`);
});
