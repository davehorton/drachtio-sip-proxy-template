module.exports = handler;

function handler({logger}) {
  return (req, res) => {
    logger.info(`received ${req.method} from ${req.protocol}/${req.source_address}:${req.source_port}`);
    logger.info(req.registration, 'registration details');

    if ('register' === req.registration.type) return register(req, res);
    else return unregister(req, res);
  };
}

async function register(req, res) {
  const registration = req.registration;
  const expires = registration.expires;
  const contactHdr = req.get('Contact');

  res.send(200, {
    headers: {
      'Contact': contactHdr,
      'Expires': expires
    }
  });
}

async function unregister(req, res) {
  res.send(200, {
    headers: {
      'Contact': req.get('Contact'),
      'Expires': 0
    }
  });
}
