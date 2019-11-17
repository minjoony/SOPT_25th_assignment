var express = require('express');
var router = express.Router();

// localhost:3000/api/news/like
router.get('/', (req,res) => {
    res.send('좋아하는 news입니다.');
});

module.exports = router;
