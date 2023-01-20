const express = require('express');
const app = express();
const { User } = require('./db');
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', async (req, res, next) => {
    try {
      res.send('<h1>Welcome to Football Legend!</h1><p>Log in via POST /login or register via POST /register</p>');
    } catch (error) {
      console.error(error);
      next(error)
    }
  });

module.exports = app;