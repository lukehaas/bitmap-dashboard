const sh = require('shelljs');

function main(config) {
  sh.echo('--- Starting development environment');

  sh.env['NODE_ENV'] = config.nodeEnv;
  sh.env['HOST'] = config.host;

  const commandParts = [
    'npx',
    'nodemon',
    '--watch server',
    '--watch client/config',
    'server/index.js',
  ];
  sh.exec(commandParts.join(' '));
}

const thisConfig = {
  nodeEnv: 'development',
  host: 'http://localhost:3000',
};

main(thisConfig);
