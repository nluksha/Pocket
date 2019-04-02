const express = require('express');
const bodyParser = require('body-parser');

const articles = require('./articles');


const app = express();
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/articles', (req, res, next) => {
  res.send(articles);
});

app.post('/articles', (req, res, next) => {
  const { title } = req.body;
  const article = { title };
  articles.push(article);
  
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

app.listen(app.get('port'), () => {
  console.log(`Express localhost:${app.get('port')}`);
});

module.exports = app;
