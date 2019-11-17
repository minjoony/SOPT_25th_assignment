var express = require('express');
var router = express.Router();

/* GET home page. */

// localhost:3000/
router.use('/api', require('./api'));

router.get('/', (req, res) => {
  res.send('Hello express!_made by MinJun');
})

/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

module.exports = router;
