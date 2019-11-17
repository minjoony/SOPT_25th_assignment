var express = require('express');
var router = express.Router();

/* GET home page. */

// localhost:3000/api/news/like
router.use('/like', require('./like'));

router.get('/', (req, res) => {
  res.send('Hello express_api_news!');
})

module.exports = router;
