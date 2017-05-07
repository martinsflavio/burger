const orm = require('../config/orm');

const burgers = {
  all   : (queryObj, cb) => {
    orm.selectAll(queryObj.table,cb);
  },
  add   : (queryObj, cb) => {
    queryObj.rows.forEach(thisBurger => {
      orm.insertOne(queryObj.table,queryObj.col,thisBurger,cb);
    })
  },
  update: (queryObj, cb) => {
    orm.updateOne(queryObj.table,queryObj.update,queryObj.where,cb);
  }
};


module.exports = burgers;
