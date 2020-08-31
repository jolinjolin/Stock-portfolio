var express = require("express"),
      app     = express(),
      exphbs   = require("express-handlebars"),
      path    = require("path");
    //   port    = process.env.PORT;


//set handebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//handelbars routes
app.get('/', function (req, res) {
    res.render('home');
});

app.use(express.static(path.join(__dirname,"public")));



//=========================================
app.listen(3000, function() {
      console.log('Listening on port 3000');
});