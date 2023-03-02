const jwt = require('jsonwebtoken');

const secretKey = 'hhfdsuhfdsofdoshfnmmssmsmsm';

function createToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null;
  }
}

module.exports = { createToken, verifyToken };