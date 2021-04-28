const { AuthenticationError } = require('apollo-server');

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    console.log('*** authHeader ***', authHeader);
    const token = authHeader.split('Bearer ')[1];
    console.log('*** TOKEN ***', token);
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        console.log('***USER***', user);
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid/expired token');
      }
    }
    throw new Error("Authentification token must be 'Bearer [token]'");
  }
  throw new Error('Authorization header must be provided');
};
