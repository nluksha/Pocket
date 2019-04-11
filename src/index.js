import app from './app';

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log(`Express localhost:${app.get('port')}`);
});
