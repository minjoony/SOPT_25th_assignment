var express = require('express');
var rounter = express.Router();

router.get('/', function(req, res) {
    res.send('comments');
})

router.use('/', require('./comment'));

module.exports = router;