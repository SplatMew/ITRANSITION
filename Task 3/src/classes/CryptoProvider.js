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
}

module.exports = CryptoProvider;