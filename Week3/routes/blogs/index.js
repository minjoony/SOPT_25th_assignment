var express = require('express');
var router = express.Router({mergeParams: true});

router.use('/:blogIdx/articles', require('./articles'));
router.use('/', require('./blogs'));

router.get('/', function(req, res) {
  res.send('blogs');
});

module.exports = router;