const session = require('express-session');

const sessionMiddleware = session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 60000 } // Set `secure: true` if using https
});

module.exports = sessionMiddleware;
