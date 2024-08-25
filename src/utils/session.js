const session = require('express-session');
const crypto = require('crypto');
require('dotenv').config();

const secretKey = process.env.SESSION_SECRET || '5086ece3c805708208394e285bd33250746b9ea7e3172f29a878da7d42f873e0';

const sessionMiddleware = session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 60000 } // Set `secure: true` if using https
});

module.exports = sessionMiddleware;
