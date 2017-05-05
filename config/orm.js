const db = require('./connection');


///////// test DB connection ///////////
db.connect(err => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + db.threadId);
});
///////////////////////////////////////

const Orm = {
  selectAll: (obj,cb) => {
    let query = [obj.table];

    db.query('SELECT * FROM ??', query, (err,res) =>{
      if (err) throw err;
      cb(res);
    })
  },
  insertOne: (obj,cb) =>{
    let query1 = [obj.table, {burger_name:obj.burger_name}];

    db.query('SELECT * FROM ?? WHERE ? ', query1, (err,res) =>{
      // check if burger already exist's
      if (res.length > 0) {
        cb('Orm already Exist\'s!');
      } else {
        // insert new  burger into table
        let query2 = [
          obj.table,
          {
            burger_name: obj.burger_name,
            devoured: obj.devoured
          }
        ];
        db.query('INSERT INTO ?? SET ? ', query2, (err,res) =>{
          if (err) throw err;
          // return new burger form DB
          let query3 = [
            obj.table,
            {
              id:res.insertId
            }
          ];
          db.query('SELECT * FROM ?? WHERE ?',query3, (err,res)=>{
            cb(res);
          })
        })
      }
    });
  },
  updateOne: (obj,cb) => {
    let query1 = [obj.table, obj.update, obj.where];

    db.query('UPDATE ?? SET ? WHERE ?', query1, (err,res) =>{
      if (err) throw err;
      if(res.changedRows > 0){
        let query2 = [obj.table, obj.where];
        db.query('SELECT * FROM ?? WHERE ?', query2, (err,res) =>{
          cb(res);
        })
      } else {
        cb('Orm already devoured!');
      }

    })
  }
};

module.exports = Orm;

//////// SELECT ALL /////////////
/*const query = {
  table: 'burgers'
};
Orm.selectAll(query, burgers =>{
  console.log(burgers);
});*/

////////// INSERT ONE //////////
/*const  query = {
  table: 'burgers',
  burger_name: 'x-minhoca',
  devoured: false
};
Orm.insertOne(query, burger => {
  console.log(burger);
});*/

///////// UPDATE ONE ////////////
/*const query = {
  table: 'burgers',
  update: {devoured:true},
  where: {id:9}
};

Orm.updateOne(query, burger => {
  console.log(burger)
});*/
