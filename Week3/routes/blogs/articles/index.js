var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('articles');
});

router.use('/', require('./article'));
router.use('/:articleIdx/comments', require('./comments'));

module.exports = router;