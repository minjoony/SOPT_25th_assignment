var express = require('express');
var router = express.Router();

router.use('/blogs', require('./blogs'));
router.use('/users', require('./users'));

/* GET home page. */
router.get('/', function(req, res) {
  res.send('Week_3 Assignment by Min Joon');
});

module.exports = router;