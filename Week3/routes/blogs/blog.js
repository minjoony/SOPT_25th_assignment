var express = require('express');
var router = express.Router({mergeParams: true});

const aU = require('../../module/utils/authUtil');
const rM = require('../../module/utils/responseMessage');
const sC = require('../../module/utils/statusCode');
const Blog = require('../../model/Blog');

// 1. 블로그 전체 보기
router.get('/', (req, res) => {
  Blog.readAll.then(({
    code,
    json
  }) => {
    res.status(code).send(json);
  }).catch(err => {
    console.log(err);
    res.status(sC.INTERNAL_SERVER_ERROR).send(aU.successFalse(rM.POST_READ_ALL_FAIL));
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
    res.status(sC.INTERNAL_SERVER_ERROR).send(aU.successFalse(rM.POST_READ_FAIL));
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
    res.status(sC.INTERNAL_SERVER_ERROR).send(aU.successFalse(rM.POST_CREATE_FAIL));
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
    res.status(sC.INTERNAL_SERVER_ERROR).send(aU.successFalse(rM.POST_UPDATE_FAIL));
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
    res.status(sC.INTERNAL_SERVER_ERROR).send(aU.successFalse(rM.POST_DELETE_FAIL));
  });
});

module.exports = router;