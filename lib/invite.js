const config = require('config');

module.exports = handler;

function handler({logger}) {
  return async(req, res) => {
    const srf = req.srf;
    const callId = req.get('Call-ID');
    logger.info({callId}, `received ${req.method} from ${req.protocol}/${req.source_address}:${req.source_port}`);
    try {
      const results = await srf.proxyRequest(req, config.get('uas'));
      this.logger.info({callId, results}, 'results from proxying INVITE');
    } catch (err) {
      logger.error({err, callId}, 'Error proxying call');
    }
  };
}
