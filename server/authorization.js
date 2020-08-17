const jwt = require('jsonwebtoken');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const logger = require('../src/utils/logger');

let pems;
const iss =
  'https://cognito-idp.eu-west-2.amazonaws.com/3sg6tlld51p9h8pdr5qc3itt36/.well-known/jwks.json';
const ERROR_MESSAGE_UNAUTHORIZED = 'Unauthorized';

function validateToken(req, res, next) {
  const token = req.authorizationToken;
  // Fail if the token is not jwt
  const decodedJwt = jwt.decode(token, { complete: true });
  if (!decodedJwt) {
    logger('Not a valid JWT token');
    res.status(500).send(new Error(ERROR_MESSAGE_UNAUTHORIZED));
  }

  // Fail if token is not from your User Pool
  if (decodedJwt.payload.iss !== iss) {
    logger('invalid issuer');
    res.status(500).send(new Error(ERROR_MESSAGE_UNAUTHORIZED));
  }

  // Reject the jwt if it's not an 'Access Token'
  if (decodedJwt.payload.token_use !== 'access') {
    logger('Not an access token');
    res.status(500).send(new Error(ERROR_MESSAGE_UNAUTHORIZED));
  }

  // Get the kid from the token and retrieve corresponding PEM
  const { kid } = decodedJwt.header;
  const pem = pems[kid];
  if (!pem) {
    logger('Invalid access token');
    res.status(500).send(new Error(ERROR_MESSAGE_UNAUTHORIZED));
  }

  // Verify the signature of the JWT token to ensure it's
  // really coming from your User Pool
  jwt.verify(token, pem, { issuer: iss }, function (err) {
    if (err) {
      res.status(500).send(new Error(ERROR_MESSAGE_UNAUTHORIZED));
    }
    next();
  });
}

function authorization(req, res, next) {
  if (req.method !== 'post') {
    if (!pems) {
      // Download the JWKs and save it as PEM
      request(
        {
          url: `${iss}/.well-known/jwks.json`,
          json: true,
        },
        function (error, response, body) {
          if (!error && response.statusCode === 200) {
            pems = {};
            const { keys } = body;
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
            validateToken(req, res, next);
          }
          // Unable to download JWKs, fail the call
          res.status(500).send(new Error('Error'));
        },
      );
    } else {
      // PEMs are already downloaded, continue with validating the token
      validateToken(req, res, next);
    }
  }
  next();
}

module.exports = authorization;
