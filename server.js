const express = require('express');
const db = require('./models');

const PORT = process.env.NODE_ENV || 3000;
const app = express();

db.sequelize.sync().then(() => {
  app.listen(PORT, ()=>{
    console.log('Listening to Port => %s',PORT);
  })
});
