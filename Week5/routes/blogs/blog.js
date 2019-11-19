var express = require('express');
var router = express.Router({mergeParams: true}); // mergeParams 디폴트는 false다. 이는 /:로 넘어온 값을 그 다음 routes로 못 넘겨준다.

const aU = require('../../module/utils/authUtil');
const rM = require('../../module/utils/responseMessage');
const sC = require('../../module/utils/statusCode');
const Blog = require('../../model/Blog');

const THIS_LOG = "블로그";

// 1. 블로그 전체 보기
router.get('/', (req, res) => {
  Blog.readAll().then(({
    code,
    json
  }) => {
    res.status(code).send(json);
  }).catch(err => {
    console.log(err);
    res.status(sC.INTERNAL_SERVER_ERROR).send(aU.successFalse(rM.X_READ_ALL_FAIL(THIS_LOG)));
  });
});

// 2. 블로그 하나 보기
router.get('/:blogIdx', async (req, res) => {
  Blog.readOne(req.params.blogIdx).then(({
    code,
    json
  }) => {
    res.status(code).send(json);
  }).catch(err => {
    console.log(err);
    res.status(sC.INTERNAL_SERVER_ERROR).send(aU.successFalse(rM.X_READ_FAIL(THIS_LOG)));
  });
});

// 3. 블로그 생성하기
router.post('/', async (req, res) => {
  Blog.create(req.body).then(({
    code,
    json
  }) => {
    res.status(code).send(json);
  }).catch(err => {
    console.log(err);
    res.status(sC.INTERNAL_SERVER_ERROR).send(aU.successFalse(rM.X_CREATE_FAIL(THIS_LOG)));
  });
});

// 4. 블로그 수정하기
router.put('/', (req, res) => {
  Blog.update(req.body).then(({
    code,
    json
  }) => {
    res.status(code).send(json);
  }).catch(err => {
    console.log(err);
    res.status(sC.INTERNAL_SERVER_ERROR).send(aU.successFalse(rM.X_UPDATE_FAIL(THIS_LOG)));
  });
});

// 5. 블로그 삭제하기
router.delete('/', (req, res) => {
  Blog.delete(req.body).then(({
    code,
    json
  }) => {
    res.status(code).send(json);
  }).catch(err => {
    console.log(err);
    res.status(sC.INTERNAL_SERVER_ERROR).send(aU.successFalse(rM.X_DELETE_FAIL(THIS_LOG)));
  });
});

module.exports = router;