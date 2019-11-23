const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.json({
    success: "true",
    message: "전체 조회 성공",
    data: [
      { officeIdx: 1, officeNum: 100, numOfBicycle: 7 },
      { officeIdx: 2, officeNum: 101, numOfBicycle: 9 },
      { officeIdx: 3, officeNum: 102, numOfBicycle: 2 }
    ]
  });
});

module.exports = router;
