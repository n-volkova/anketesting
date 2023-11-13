const express = require('express');
const bodyParser = require('body-parser');
const DEBUG = process.env.NODE_ENV !== 'production';

const init = async () => {
  console.log(`RUN IN ${DEBUG ? 'DEBUG' : 'PROD'}`);

  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  if (!DEBUG) {
    app.use(require('morgan')('combined'));
  }

  app.use(require('cors')({credentials: true, origin: DEBUG ? 'http://localhost:8080' : 'https://anketesting.rocketbank.ru'}));

  app.post('/api/saveToChat',
    require('./routes/saveToChat')
  );

  app.get('/api/health', function(req, res) {
    res.sendStatus(200);
  });

  app.listen(3000, function () {
    console.log('App listening on port 3000!');
  });
};

console.log('INIT');

init();
