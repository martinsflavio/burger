const db = require('../models');
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  db.Burgers.findAll({
    include: [db.Clients]
  }).then(data => {

    let burgersList = {
      burgers: data
    };



   //res.json(data);
   res.render('index', burgersList );


  });
});


module.exports = router;



