const sqlite3 = require('sqlite3').verbose();

const dbName = 'later.sqlite';
const db = new sqlite3.Database(dbName);

db.serialize(() => {
  const sql = `CREATE TABLE IF NOT EXISTS articles (id integer primary key, title, content TEXT)`;

  db.run(sql);
});

class Article {
  static all(cd) {
    db.all('SELECT * FROM articles', cd);
  }

  static find(id, cd) {
    db.get('SELECT * FROM articles WHERE id = ?', id, cd);
  }

  static create(data, cd) {
    const sql = 'INSERT INTO articles(title, content) VALUES (?, ?)';

    db.run(sql, data.title, data.content, cd);
  }

  static delete(id, cd) {
    if (!id) {
      cd(new Error('Please provide an id'));
      return;
    }

    const sql = 'DELETE FROM articles WHERE id = ?';
    db.run(sql, id, cd);
  }
}

module.exports = db;
module.exports.Article = Article;
