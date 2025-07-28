const crypto = require('crypto');

class CryptoProvider {
  generateSecureKey() {
    return crypto.randomBytes(32);
  }
  
  calculateHMAC(message, key) {
    const hmac = crypto.createHmac('sha3-256', key);
    hmac.update(message.toString());
    return hmac.digest('hex').toUpperCase();
  }
  
  generateSecureRandomInt(min, max) {
    const range = max - min + 1;
    return crypto.randomInt(min, max + 1);
  }
}

module.exports = CryptoProvider;