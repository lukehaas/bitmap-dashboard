require('isomorphic-fetch');
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const path = require('path');
const compression = require('compression');
const { ApolloServer } = require('apollo-server-express');
const helmet = require('helmet');
const memjs = require('memjs');

const resolvers = require('./modules/resolvers');
const typeDefs = require('./modules/typeDefs');
const { getImage } = require('./modules/scraper');

const mc = memjs.Client.create(process.env.MEMCACHIER_SERVERS, {
  failover: true, // default: false
  timeout: 1, // default: 0.5 (seconds)
  keepAlive: true, // default: false
});

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

const port = parseInt(process.env.PORT, 10) || 3000;
const nodeEnv = process.env.NODE_ENV;

server.applyMiddleware({ app });

if (nodeEnv === 'development') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  // const webpackHotMiddleware = require('webpack-hot-middleware');

  const compiler = webpack(require('../webpack.dev.config'));
  app.use(express.static('public'));
  app.use(webpackDevMiddleware(compiler));

  // app.use(
  //   webpackHotMiddleware(compiler, {
  //     log: console.log,
  //   })
  // );
} else {
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
  // app.use(compression());
  app.use(express.static('public'));
  app.use([/(.*)\.html$/, '/'], express.static('client/dist'));
}

app.get('/:id', (req, res) => {
  res.header('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname + '/../client/dist/index.html'));
});

const getRandomConfig = () => {
  const configs = ['artbw', 'one'];
  const rand = Math.floor(Math.random() * configs.length);

  return configs[rand];
};

app.get('/image/:id', (req, res) => {
  const id = req.params.id === 'one' ? getRandomConfig() : req.params.id;
  const cacheKey = `image_${id}_${req.query.charge}`;
  mc.get(cacheKey, function (err, val) {
    if (err == null && val != null) {
      // Found it!
      res.header('Content-Type', 'image/bmp');
      res.end(val, 'binary');
    } else {
      getImage(id, req.query.charge)
        .then(image => {
          mc.set(cacheKey, image, { expires: 600 }, function (err, val) {
            console.log(err);
          });
          res.header('Content-Type', 'image/bmp');
          res.end(image, 'binary');
        })
        .catch(err => res.status(500).send(err));
    }
  });
});

app.listen({ port }, () => {
  console.log(`Server running on http://localhost:${port}`);
});
