const express = require('express');
const burgers = require('../models/burger.js');
let router = express.Router();



router.get('/', (req, res) => {

  burgers.all({table:'burgers'}, data =>{
    let burgersList = {
      burgers: data
    };
   res.render('index', burgersList);
  });
});

router.post('/api/new', (req, res) => {

  let burger = {
    table: 'burgers',
    col: ['burger_name','devoured'],
    rows:[
      [req.body.burger_name]
      // To add multiple burgers at the same time just add more arrays
    ]
  };
  burgers.add(burger, data => {
    res.redirect('/');
  });
});

router.put('/:id', (req, res) =>{

  let burger = {
    table:'burgers',
    update: req.body,
    where: {id:parseInt(req.params.id)}
  };
  burgers.update(burger, data => {
    res.redirect('/');
  })
});

module.exports = router;

