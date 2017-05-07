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
  selectAll: (table,cb) => {
   let query;

    // Query #1
    query = table;
    db.query('SELECT * FROM ??', query, (err,res) =>{
      if (err) throw err;
      cb(res);
    })
  },
  insertOne: (table,col,val,cb) =>{
    let query;
    let commands;

    // Query #1
    query = [table,col[0],val[0]];
    db.query('SELECT * FROM ?? WHERE ?? = ?', query, (err,res) =>{
      // check if burger already exist's
      if (res.length > 0) {
        cb('Burger '+ burger +' already Exist\'s!');
      } else {

        // Query #2
        // (TODO) Is this better than having everything as a string?
        if (val[1]) {
          commands = 'INSERT INTO ?? (??,??) VALUES (?,?) ';
          query = [table,col[0],col[1],val[0],val[1]];
        } else {
         commands = 'INSERT INTO ?? (??) VALUES (?) ';
          query = [table,col[0],val[0]];
        }
        db.query(commands, query, (err,res) =>{
          if (err) throw err;
          // Query #3
          query = [table,'id',res.insertId];
          // return new burger form DB
          db.query('SELECT * FROM ?? WHERE ?? = ?',query, (err,res)=>{
            cb(res);
          })
        })
      }
    });
  },
  updateOne: (table,update,where,cb) => {
    let query;

    // Query #1
    query = [table,update,where];

    db.query('UPDATE ?? SET ? WHERE ?', query, (err,res) =>{
      if (err) throw err;
      if(res.changedRows > 0){

        // Query #2
        query = [table,where];
        db.query('SELECT * FROM ?? WHERE ?', query, (err,res) =>{
          cb(res);
        })
      } else {
        console.log(res);
        cb('Burger already devoured!');
      }

    })
  }
};

module.exports = Orm;
