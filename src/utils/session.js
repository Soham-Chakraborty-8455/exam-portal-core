const session = require('express-session');
const crypto = require('crypto');

const secretKey = crypto.randomBytes(32).toString('hex');

const sessionMiddleware = session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 60000 } // Set `secure: true` if using https
});

module.exports = sessionMiddleware;
