const express = require('express');
let cors = require('cors');
const mongoose = require('mongoose');
const bodyPerser = require('body-parser')
const serverless = require('serverless-http');
const app = express();
require('dotenv').config()

app.use(cors("https://netlifytodosserver.netlify.app"))
app.options('*', cors())
app.use(bodyPerser.json());

const userRoutes = require('../src/routes/userRoutes');
const todosRoutes = require('../src/routes/todosRoutes');

app.use('/todosServer', userRoutes);
app.use('/todosServer', todosRoutes);

mongoose.connect(process.env.DATABASE_URI).then((result) => {
  try {
    console.log('connect');
  } catch {
    throw new Error('something wrong with database')
  }
}).catch((err) => {
  throw new Error(err)
})

module.exports.handler = serverless(app);




