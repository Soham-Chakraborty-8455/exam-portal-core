const session = require('express-session');
require('dotenv').config();
const MongoDBStore = require('connect-mongodb-session')(session);
// const mongoose = require('mongoose');

const mongoURI = process.env.mongoURI;

const store = new MongoDBStore({
    uri: mongoURI,
    collection: 'sessions' 
});

store.on('error', function(error) {
    console.log('SESSION STORE ERROR:', error);
});


const secretKey = process.env.SESSION_SECRET || '5086ece3c805708208394e285bd33250746b9ea7e3172f29a878da7d42f873e0';

const sessionMiddleware = session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: { secure: false, maxAge: 60000 } // Set `secure: true` if using https
});

module.exports = sessionMiddleware;
