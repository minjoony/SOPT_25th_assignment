var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.send('2_Week Assignment\nKim Min Joon');
})

router.use('/api', require('./api'));

module.exports = router;