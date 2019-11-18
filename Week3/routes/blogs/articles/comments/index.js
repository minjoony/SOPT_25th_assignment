var express = require('express');
var router = express.Router({mergeParams: true});

router.use('/', require('./comment'));

router.get('/', function(req, res) {
    res.send('comments');
})


module.exports = router;