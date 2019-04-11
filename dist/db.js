"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var sqlite3 = require('sqlite3').verbose();

var dbName = 'later.sqlite';
var db = new sqlite3.Database(dbName);
db.serialize(function () {
  var sql = "CREATE TABLE IF NOT EXISTS articles (id integer primary key, title, content TEXT)";
  db.run(sql);
});

var Article =
/*#__PURE__*/
function () {
  function Article() {
    _classCallCheck(this, Article);
  }

  _createClass(Article, null, [{
    key: "all",
    value: function all(cd) {
      db.all('SELECT * FROM articles', cd);
    }
  }, {
    key: "find",
    value: function find(id, cd) {
      db.get('SELECT * FROM articles WHERE id = ?', id, cd);
    }
  }, {
    key: "create",
    value: function create(data, cd) {
      var sql = 'INSERT INTO articles(title, content) VALUES (?, ?)';
      db.run(sql, data.title, data.content, cd);
    }
  }, {
    key: "delete",
    value: function _delete(id, cd) {
      if (!id) {
        cd(new Error('Please provide an id'));
        return;
      }

      var sql = 'DELETE FROM articles WHERE id = ?';
      db.run(sql, id, cd);
    }
  }]);

  return Article;
}();

module.exports = db;
module.exports.Article = Article;