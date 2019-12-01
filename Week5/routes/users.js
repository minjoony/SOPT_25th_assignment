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
  const {userId, userPwd} = req.body;

  if(!userId || !userPwd) {
    res.status(sC.BAD_REQUEST).send(aU.successFalse(rM.NULL_VALUE));
    return;
  }

  User.signin(userId, userPwd)
  .then(({code, json}) => {
     res.status(code).send(json);
  })
  .catch(err => {
      console.log(err);
      res.status(sC.INTERNAL_SERVER_ERROR).send(rM.INTERNAL_SERVER_ERROR);
  });
})

router.post('/signup', (req, res) => {
  const {userId, userPwd} = req.body;

  // 파라미터 오류
  if(!userId || !userPwd) {
    res.status(sC.BAD_REQUEST).send(aU.successFalse(rM.NULL_VALUE));
    return;
  }

  User.signup(userId, userPwd)
  .then(({code, json}) => {
    res.status(code).send(json);
  })
  .catch(err => {
    console.log(err);
    res.status(sC.INTERNAL_SERVER_ERROR).send(rM.INTERNAL_SERVER_ERROR);
  })
})

module.exports = router;