var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.send('api');
})

router.use('/group', require('./group'));

module.exports = router;