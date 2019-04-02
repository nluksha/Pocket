const express = require('express');

const articles = require('./articles');

const port = process.env.PORT || 3000;


const app = express();

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/articles', (req, res, next) => {
  res.send(articles);
});

app.post('/articles', (req, res, next) => {
  res.send('Ok');
});

app.get('/articles/:id', (req, res, next) => {
  const { id } = req.params;
  res.send(articles[id]);
});

app.delete('/articles/:id', (req, res, next) => {
  const { id } = req.params;

  delete articles[id];

  res.send({ message: 'Deleted' });
});

app.listen(port, () => {
  console.log(`Express localhost:${port}`);
});

module.exports = app;
