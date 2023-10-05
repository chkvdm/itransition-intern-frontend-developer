import crypto from 'crypto';

export class KeyGenerator {
  generateKey() {
    return crypto.randomBytes(32);
  }

  generateHMAC(move, key) {
    const hmac = crypto.createHmac('sha256', key);
    hmac.update(move);
    return hmac.digest('hex');
  }
}
