var router = require('express').Router();
var db = new(require('locallydb'))('./.data');
var events = db.collection('events');
var login  = require('./login');

router.route('/api/events')
  .all(login.required)
  .get(function(req, res) {
    res.json(events.toArray());
  })
  .post(function(req, res) {
    var event = req.body;
    event.userId = req.user.cid;

    // to be removed
    event.username = req.user.username;
    event.fullname = req.user.fullname;
    event.email = req.user.email;

    var id = events.insert(event);
    res.json(events.get(id));
  });

module.exports = router;
