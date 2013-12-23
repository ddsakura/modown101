var express = require('express'),
    expyui = require('express-yui'),
    exphbs  = require('express3-handlebars'),
    app = express();

expyui.extend(app);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/hello', expyui.expose(), function(req, res){
  res.render('home');
});

app.listen(3000);
console.log('Listening on port 3000');