var express = require('express');
var router = express.Router();

const aU = require('../module/utils/authUtil');
const sC = require('../module/utils/statusCode');
const rM = require('../module/utils/responseMessage');
const User = require('../model/User');

/*
  [POST]localhost:3000/user/signin
  request body{
    "id":"아이디",
    "pwd":"비밀번호"
  }
*/

router.post('/signin', (req, res) => {
  const {id, pwd} = req.body;

  if(!id || !pwd) {
    res.status(sC.BAD_REQUEST).send(aU.successFalse(rM.NULL_VALUE));
    return;
  }

  User.signin(id, pwd)
  .then(({code, json}) => {
     res.status(code).send(json);
  })
  .catch(err => {
      console.log(err);
      res.status(sC.INTERNAL_SERVER_ERROR).send(rM.INTERNAL_SERVER_ERROR);
  });
})

router.post('/signup', (req, res) => {
  const {id, pwd} = req.body;

  // 파라미터 오류
  if(!id || !pwd) {
    res.status(sC.BAD_REQUEST).send(aU.successFalse(rM.NULL_VALUE));
    return;
  }

  User.signup(id, pwd)
  .then(({code, json}) => {
    res.status(code).send(json);
  })
  .catch(err => {
    console.log(err);
    res.status(sC.INTERNAL_SERVER_ERROR).send(rM.INTERNAL_SERVER_ERROR);
  })
})

module.exports = router;