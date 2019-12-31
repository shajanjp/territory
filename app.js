const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use('/public', express.static('public'))

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index.ejs');
})

module.exports = app;