import express from 'express';
import bodyParser from 'body-parser';
import read from 'node-readability';
import articlesJson from './articles';
import { Article } from './db';

const app = express();
app.use('/css/bootstrap.css', express.static('node_modules/bootstrap/dist/css/bootstrap.css'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.redirect('/articles');
});

app.get('/art', (req, res) => {
  res.send(articlesJson);
});

app.get('/articles', (req, res, next) => {
  Article.all((err, articles) => {
    if (err) {
      return next(err);
    }

    res.format({
      'text/html': () => res.render('articles.ejs', { articles }),
      '*/json': () => res.send(articles)
    });
  });
});

app.post('/articles', (req, res, next) => {
  const { url } = req.body;

  read(url, (err, result) => {
    if (err || !result) {
      return res.status(500).send('Error downloading article');
    }

    const { title, content } = result;

    Article.create({ title, content }, error => {
      if (error) {
        return next(error);
      }

      res.redirect('/articles');
    });
  });
});

app.get('/articles/:id', (req, res, next) => {
  const { id } = req.params;

  Article.find(id, (err, article) => {
    if (err) {
      return next(err);
    }

    res.format({
      'text/html': () => res.render('articleDetailes.ejs', { article }),
      '*/json': () => res.send(article)
    });
  });
});

app.delete('/articles/:id', (req, res, next) => {
  const { id } = req.params;

  Article.delete(id, err => {
    if (err) {
      return next(err);
    }

    res.send({ message: 'Deleted' });
  });
});

module.exports = app;
