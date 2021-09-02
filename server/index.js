require('isomorphic-fetch');
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const path = require('path');
const compression = require('compression');
const { ApolloServer } = require('apollo-server-express');
const Jimp = require('jimp');
const helmet = require('helmet');

const resolvers = require('./modules/resolvers');
const typeDefs = require('./modules/typeDefs');
const { getImage } = require('./modules/scraper');

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
app.use(helmet());
app.use(function (req, res, next) {
  res.setHeader('Connection', 'Keep-Alive');
  res.setHeader('Keep-Alive', 'timeout=30, max=1000');
  next();
});

const port = parseInt(process.env.PORT, 10) || 3000;
const nodeEnv = process.env.NODE_ENV;

server.applyMiddleware({ app });

if (nodeEnv === 'development') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  // const webpackHotMiddleware = require('webpack-hot-middleware');

  const compiler = webpack(require('../webpack.dev.config'));

  app.use(webpackDevMiddleware(compiler));

  // app.use(
  //   webpackHotMiddleware(compiler, {
  //     log: console.log,
  //   })
  // );
} else {
  // app.use(compression());
  app.use(express.static('public'));
  app.use([/(.*)\.html$/, '/'], express.static('client/dist'));
}

app.get('/', (req, res) => {
  res.header('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname + '/../client/dist/index.html'));
});

app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/woof.bmp'));
});

app.get('/image', (req, res) => {
  getImage()
    .then(image => Jimp.read(image))
    .then(image => image.greyscale().getBufferAsync(Jimp.MIME_BMP))
    .then(image => {
      res.header('Content-Type', 'image/bmp');
      res.header('Connection', 'Keep-Alive');
      res.header('Keep-Alive', 'timeout=30, max=1000');
      res.send(image);
    })
    .catch(err => res.status(500).send(err));
});

const expressServer = app.listen({ port }, () => {
  console.log(`Server running on http://localhost:${port}`);
});

expressServer.keepAliveTimeout = 30000;
// Ensure all inactive connections are terminated by the ALB, by setting this a few seconds higher than the ALB idle timeout
expressServer.headersTimeout = 31000;
