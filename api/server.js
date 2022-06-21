const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require('express-session');

const usersRouter = require('./users/users-router');
// const authRouter = require('./auth/auth-router');

const server = express();

const sessionConfig = {
  name: 'session',
  secret: 'SOME_PASSWORD',
  cookie: {
    maxAge: 1000 * 60 * 5,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false
}

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionConfig));

server.use('/api/users', usersRouter);
// server.use('/api/auth', authRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
