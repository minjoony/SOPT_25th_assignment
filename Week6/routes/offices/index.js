const express = require("express");
const router = express.Router();

const aU = require('../../module/utils/authUtil');
const rM = require('../../module/utils/responseMessage');
const sC = require('../../module/utils/statusCode');

const Office = require('../../model/Office');

router.get("/", function(req, res, next) {
  Office.getAll().then(({code, json}) => {
    res.status(code).send(json);
  })
  .catch(err => {
    console.log(err);
    res.status(sC.INTERNAL_SERVER_ERROR).send(aU.successFalse(rM.GET_OFFICE_FAIL));
  })
});

module.exports = router;
