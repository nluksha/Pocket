"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _nodeReadability = _interopRequireDefault(require("node-readability"));

var _articles = _interopRequireDefault(require("./articles"));

var _db = require("./db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use('/css/bootstrap.css', _express["default"]["static"]('node_modules/bootstrap/dist/css/bootstrap.css'));
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.get('/', function (req, res) {
  res.redirect('/articles');
});
app.get('/art', function (req, res) {
  res.send(_articles["default"]);
});
app.get('/articles', function (req, res, next) {
  _db.Article.all(function (err, articles) {
    if (err) {
      return next(err);
    }

    res.format({
      'text/html': function textHtml() {
        return res.render('articles.ejs', {
          articles: articles
        });
      },
      '*/json': function json() {
        return res.send(articles);
      }
    });
  });
});
app.post('/articles', function (req, res, next) {
  var url = req.body.url;
  (0, _nodeReadability["default"])(url, function (err, result) {
    if (err || !result) {
      return res.status(500).send('Error downloading article');
    }

    var title = result.title,
        content = result.content;

    _db.Article.create({
      title: title,
      content: content
    }, function (error) {
      if (error) {
        return next(error);
      }

      res.redirect('/articles');
    });
  });
});
app.get('/articles/:id', function (req, res, next) {
  var id = req.params.id;

  _db.Article.find(id, function (err, article) {
    if (err) {
      return next(err);
    }

    res.format({
      'text/html': function textHtml() {
        return res.render('articleDetailes.ejs', {
          article: article
        });
      },
      '*/json': function json() {
        return res.send(article);
      }
    });
  });
});
app["delete"]('/articles/:id', function (req, res, next) {
  var id = req.params.id;

  _db.Article["delete"](id, function (err) {
    if (err) {
      return next(err);
    }

    res.send({
      message: 'Deleted'
    });
  });
});
module.exports = app;