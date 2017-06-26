const db = require('../models');
const express = require('express');
const router = express.Router();




router.post('/new', (req, res) => {
  let burger = {
    burger_name: req.body.burger_name
  };
  db.Burgers.create(burger).then(data => {
    res.redirect('/');
  })
});





router.post('/:id', (req, res) => {
  let burger = {
    // luckily, sequelize is smart enough to do some type casting under the hood, so there's no
    // need to use parseInt here.
    update: { devoured: req.body.devoured },
    where: { where:{ id: req.params.id }}
  };

  // Readability preference of mine is to opt for white space between arguments, obeject properties, etc.
  // Doesn't make a functional difference, but I find it much easier to read through code and spot potential
  // typos, bugs, etc.
  db.Clients.create({ name: req.body.client_name, BurgerId: req.params.id }).then(client =>{
    db.Burgers.update(burger.update, burger.where).then(data => {
      res.redirect('/');
    });
  });
});



module.exports = router;