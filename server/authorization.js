/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const axios = require('axios');
const jwkToPem = require('jwk-to-pem');
const logger = require('../src/utils/logger');

let pems;
const iss = 'https://cognito-idp.eu-west-2.amazonaws.com/eu-west-2_deNO5pYzq';
const ERROR_MESSAGE_UNAUTHORIZED = 'Unauthorized';

function validateToken(req, res, next) {
  logger(req.headers);
  const token = req.headers.authorization;
  logger('token:', token);
  // Fail if the token is not jwt
  const decodedJwt = jwt.decode(token, { complete: true });
  if (!decodedJwt) {
    logger('Not a valid JWT token');
    return new Error(ERROR_MESSAGE_UNAUTHORIZED);
  }

  // Fail if token is not from your User Pool
  if (decodedJwt.payload.iss !== iss) {
    logger('invalid issuer');
    return new Error(ERROR_MESSAGE_UNAUTHORIZED);
  }

  // Reject the jwt if it's not an 'Access Token'
  if (decodedJwt.payload.token_use !== 'access') {
    logger('Not an access token');
    return new Error(ERROR_MESSAGE_UNAUTHORIZED);
  }

  // Get the kid from the token and retrieve corresponding PEM
  const { kid } = decodedJwt.header;
  const pem = pems[kid];
  if (!pem) {
    logger('Invalid access token');
    return new Error(ERROR_MESSAGE_UNAUTHORIZED);
  }

  // Verify the signature of the JWT token to ensure it's
  // really coming from your User Pool
  jwt.verify(token, pem, { issuer: iss }, (err) => {
    if (err) {
      return new Error(ERROR_MESSAGE_UNAUTHORIZED);
    }
    next();
  });
}

function authorization(req, res, next) {
  if (req.method !== 'post') {
    if (!pems) {
      // Download the JWKs and save it as PEM
      axios
        .get(`${iss}/.well-known/jwks.json`)
        .then((response) => {
          pems = {};
          logger('data?', response.data);
          const { keys } = response.data;
          for (let i = 0; i < keys.length; i += 1) {
            // Convert each key to PEM
            const keyId = keys[i].kid;
            const modulus = keys[i].n;
            const exponent = keys[i].e;
            const keyType = keys[i].kty;
            const jwk = { kty: keyType, n: modulus, e: exponent };
            const pem = jwkToPem(jwk);
            pems[keyId] = pem;
          }
          // Now continue with validating the token
          logger('Found PEMs!!!!');
          return validateToken(req, res, next);
        })
        .catch((error) => {
          logger('error', error);
          return error;
        });
    } else {
      // PEMs are already downloaded, continue with validating the token
      logger('PEMs');
      return validateToken(req, res, next);
    }
  }
  logger('Public route');
  next();
}

module.exports = authorization;
