const auth = require('drachtio-mw-digest-auth') ;
const config = require('config');
const parseUri = require('drachtio-srf').parseUri;
const domains = config.get('domains');


function isValidDomain(domain) {
  console.log(`checking domain: ${domain} in ${JSON.stringify(domains)}`);
  return domain in domains;
}

function getUserPassword(domain, username) {
  const users = domains[domain];
  console.log(`checking for ${username} in ${JSON.stringify(users)}`);
  if (username in users) return users[username];
}

// return the middleware function
module.exports = auth({
  realm: (req) => {
    const uri = parseUri(req.uri);
    return isValidDomain(uri.host) ? uri.host : null;
  },
  passwordLookup: (username, realm, callback) => {
    const password = getUserPassword(realm, username);
    if (password) return callback(null, password);
    return callback(new Error(`unknown user ${username}`));
  }
});
