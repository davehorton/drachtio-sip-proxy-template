const Srf = require('drachtio-srf');
const srf = new Srf();
const config = require('config');
const logger = require('pino')(config.get('logging'));
const regParser = require('drachtio-mw-registration-parser') ;
const digestChallenge = require('./lib/middleware');

srf.connect(config.get('drachtio'));
srf.on('connect', (err, hp) => {
  if (err) throw err;
  logger.info(`connected to drachtio listening on ${hp}`);
})
  .on('error', (err) => logger.error(err));

// middleware
srf.use('register', [regParser, digestChallenge]);

srf.invite(require('./lib/invite')({logger}));
srf.register(require('./lib/register')({logger}));

