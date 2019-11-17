var express = require('express');
var router = express.Router();

/* GET home page. */

// localhost:3000/api/news
router.use('/news', require('./news'));

// localhost:3000/api/blog
router.use('/blog', require('./blog'));

// localhost:3000/api/cafe
router.use('/cafe', require('./cafe'));

router.get('/', (req, res) => {
  res.send('Hello express_api!');
})

module.exports = router;
