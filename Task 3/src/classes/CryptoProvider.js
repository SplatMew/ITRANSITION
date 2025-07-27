const crypto = require('crypto');

class CryptoProvider {
    generateSecureKey(){
        return crypto.randomBytes(32);
    }

    calculateHMAC(message, key){
        const hmac = crypto.createHmac('sha3-256', key);
        hmac.update(message.toString());
        return hmac.digest('hex').toUpperCase();
    }

    generateSecureRandomInt(min, max){
        const range = max - min + 1;
        const bytesNeeded = Math.ceil(Math.log2(range)/8);
        const maxValid = Math.floor(Math.pow(256, bytesNeeded) / range) * range;
        
        let randomValue;
        do{
            const randomBytes = crypto.randomBytes(bytesNeeded);
            randomValue = 0;

            for(let i = 0; i< bytesNeeded; i++){
                randomValue = (randomValue << 8) | randomBytes[i];
            }
        } while(randomValue >= maxValid);
        
        return min + (randomValue % range);
    }
}

module.exports = CryptoProvider;