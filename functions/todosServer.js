let cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyPerser = require('body-parser')
const app = express();
require('dotenv').config()
const uri = process.env.DATABASE_URI

app.use(cors())

app.use(bodyPerser.json());
const serverless = require('serverless-http');

const userRoutes = require('../src/routes/userRoutes');
const todosRoutes = require('../src/routes/todosRoutes');

app.use('/todosServer/getUser',userRoutes);
app.use('/todosServer', todosRoutes);

mongoose.connect(uri).then((result)=>{
  try{
     console.log('connect'); 
    }catch{
      throw new Error('something wrong with database')
    }
  }).catch((err)=>{
  throw new Error(err)
})

module.exports.handler = serverless(app);




