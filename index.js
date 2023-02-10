require('dotenv').config('.env');
const express = require('express');
const cors = require('cors');
const app = express();
const { User, Team } = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT = 10;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const { JWT_SECRET } = process.env;

app.get('/', async (req, res, next) => {
    try {
      res.send(`<h1>Welcome to Football Legend!</h1><p>Log in via POST /login or register via POST /register</p>`);
    } catch (error) {
      console.error(error);
      next(error)
    }
  });

const setUser = async (req, res, next) => {
  try {
    const auth = req.header('Authorization');
    if(!auth) {
      next();
    } else {
      const [, token] = auth.split(' ');
      const user = jwt.verify(token, JWT_SECRET);
      req.user = user;
      next();
    }
  } catch(e) {
    console.log(e);
    res.status(500).send('Error');
  }
}

app.get('/users', setUser, async (req, res, next) => {
    const users = await User.findAll();
    if(req.user) {
      res.status(200).send({users});
    } else {
      res.status(401).send('Unauthorized');
    }
});

app.post('/register', async (req, res) => {
  try {
    const {username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, SALT);
    await User.create({username, password: hashedPassword});
    res.status(200).json('User created successfully!');
  } catch(e) {
    console.log(e);
    res.status(500).send('Error creating user!');
  }
});

app.post('/login', async (req, res, next) => {
  try{
    const {username, password} = req.body;
    const foundUser = await User.findOne({where: {username}});
    
    if(foundUser) {
      const validPassword = await bcrypt.compare(password, foundUser.password);
      if(validPassword){
        const {id, username} = foundUser;
        const token = jwt.sign({
          username: username
        }, JWT_SECRET);
        res.send({message: 'success', token: token});
        //res.status(200).send(`Successfully logged in as: ${username}`);
      } else {
        res.status(401).send('Incorrect password');
      } 
    } else {
      res.status(404).send('User does not exist!');
    }
  } catch(e) {
    console.log(e);
    next(e);
  }
});

app.get('/teams', setUser, async (req, res, next) => {
  const teams = await Team.findAll();
  if(req.user) {
    res.status(200).send({teams});
  } else {
    res.status(401).send('Unauthorized');
  }
})

app.post('/team', async (req, res, next) => {
  try {
    const {username, password} = req.body;
    await Team.create({username, password: hashedPassword});
    res.send('Team successfully added!');
  } catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = app;