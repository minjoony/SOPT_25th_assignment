var express = require('express');
var router = express.Router();

// localhost:3000/api/blog
router.get('/', (req,res) => {
    res.send('블로그 입니다.');
});

module.exports = router;
