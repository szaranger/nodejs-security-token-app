var router = require('express').Router();
var bodyParser = require('body-parser');
var login = require('./login');
var passport = login.passport;

router.use(bodyParser.urlencoded({ extend: true })); // login page
router.use(bodyParser.json()); // API
router.use(require('cookie-parser')());
router.use(require('express-session') ({
  secret: 'abc123',
  resave: false,
  saveUninitialized: true
}));

router.use(passport.initialize());
router.use(passport.session());

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/signup', function(req, res) {
  if(users.where({ username: req.body.username }).items.length === 0) {
    var user = {
      fullname: req.body.fullname,
      email: req.body.email,
      username: req.body.username,
      passwordHash: hash(req.body.password),
      following: []
    };

    var userId = users.insert(user);

    req.login(users.get(userId), function (err) {
      if (err) return next(err);
    });
  } else {
    res.redirect('/login');
  }
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

exports.routes = router;
