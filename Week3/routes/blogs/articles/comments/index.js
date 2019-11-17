var express = require('express');
var router = express.Router();

router.use('/', require('./comment'));

router.get('/', function(req, res) {
    res.send('comments');
})


module.exports = router;