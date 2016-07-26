var config = {}

config.idmURL = 'http://localhost:8000';
config.client_id = '5f3193e8774544e28554653a343e5512';
config.client_secret = '8eaeba97b0dd4ffaae768f39155b7467';
config.callbackURL = 'http://localhost:3000/auth/provider/callback';

// Depending on Grant Type:
// Authorization Code Grant: code
// Implicit Grant: token
config.response_type = 'code';

// FIWARE Orion configuration<
config.orion_url = 'http://localhost:1026/v2';

module.exports = config;
