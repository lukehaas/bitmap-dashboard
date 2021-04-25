const sh = require('shelljs');

function main(config) {
  sh.echo('--- Starting development environment');

  sh.env['NODE_ENV'] = config.nodeEnv;

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
};

main(thisConfig);
