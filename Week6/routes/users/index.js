const express = require("express");
const router = express.Router();

const aU = require('../../module/utils/authUtil');
const rM = require('../../module/utils/responseMessage');
const sC = require('../../module/utils/statusCode');

const User = require('../../model/User');

// 로그인
router.post("/signin", function(req, res, next) {
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
});

// 회원가입
router.post("/signup", function(req, res, next) {
  const {userId, userPwd} = req.body;

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
});

// 회원조회
router.get("/:userIdx", function(req, res, next) {
  User.userget(req.params.userIdx).then(({code, json}) => {
    res.status(code).send(json);
  })
  .catch(err => {
    console.log(err);
    res.status(sC.INTERNAL_SERVER_ERROR).send(aU.successFalse(rM.GET_USER_FAIL(THIS_LOG)));
  });
});

module.exports = router;
