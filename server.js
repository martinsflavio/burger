const express    = require('express'),
      override   = require('method-override'),
      bodyParser = require('body-parser'),
      exphbs     = require("express-handlebars"),
      app        = express(),
      db         = require('./models'),
      PORT       = process.env.PORT || 8080;



app.use(express.static(process.cwd() + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(override("_method"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// routes
app.use('/', require('./routes/view-routes'));
app.use('/api', require('./routes/api-routes'));



db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });
});
