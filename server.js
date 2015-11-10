var express = require('express');
var login = require('./src/login');
var router = require('./src/router');
var cors = require('./src/cors');
var events = require('./src/events');
var app = express();

app
  .set('view engine', 'ejs')
  .use(express.static('./public'))
  .use(cors())
  .use(router.routes)
  .use(events)
  .get('*', login.required, function (req, res) {
    res.render('index', {
      user: login.safe(req.user)
    });
  })
  .listen(3000);
