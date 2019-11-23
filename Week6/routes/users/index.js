const express = require("express");
const router = express.Router();

/* GET users listing. */
router.post("/signin", function(req, res, next) {
  res.json({
    status: 200,
    success: true,
    message: "로그인 성공",
    data: {
      userIdx: 1,
      userId: "user1"
    }
  });
});

router.post("/signup", function(req, res, next) {
  res.json({
    status: 200,
    success: true,
    message: "회원가입 성공"
  });
});

router.get("/:userIdx", function(req, res, next) {
  const userIdx = req.params.userIdx;
  console.log(userIdx);
  res.json({
    status: 200,
    success: true,
    message: "회원 조회 성공",
    data: { userIdx: userIdx, userId: `user${userIdx}` }
  });
});
module.exports = router;
