require('isomorphic-fetch');
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const path = require('path');
const compression = require('compression');
const { ApolloServer } = require('apollo-server-express');
const helmet = require('helmet');

const resolvers = require('./modules/resolvers');
const typeDefs = require('./modules/typeDefs');
const { getImage } = require('./modules/scraper');

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

app.get('/image/:id', (req, res) => {
  getImage(req.params.id, req.query.charge)
    .then(image => {
      res.header('Content-Type', 'image/bmp');
      res.end(image, 'binary');
    })
    .catch(err => res.status(500).send(err));
});

app.listen({ port }, () => {
  console.log(`Server running on http://localhost:${port}`);
});
