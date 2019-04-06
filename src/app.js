import express from 'express';
import bodyParser from 'body-parser';
import articles from './articles';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/articles', (req, res) => {
  res.send(articles);
});

app.post('/articles', (req, res) => {
  const { title } = req.body;
  const article = { title };
  articles.push(article);

  res.send('Ok');
});

app.get('/articles/:id', (req, res) => {
  const { id } = req.params;
  res.send(articles[id]);
});

app.delete('/articles/:id', (req, res) => {
  const { id } = req.params;

  delete articles[id];

  res.send({ message: 'Deleted' });
});

module.exports = app;
