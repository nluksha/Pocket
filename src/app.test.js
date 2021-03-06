import request from 'supertest';

import app from './app';

describe('Test the root app path', () => {
  test('It should response the GET method', done => {
    request(app)
      .get('/articles')
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
