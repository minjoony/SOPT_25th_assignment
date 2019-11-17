var express = require('express');
var router = express.Router();

router.use('/', require('./article'));
router.use('/:articleIdx/comments', require('./comments'));

router.get('/', function(req, res) {
  res.send('articles');
});


module.exports = router;