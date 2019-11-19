var express = require('express');
var router = express.Router({mergeParams: true});

const sC = require('../../../../module/utils/statusCode');
const rM = require('../../../../module/utils/responseMessage');
const aU = require('../../../../module/utils/authUtil');

const comment = require('../../../../model/Comment');

const THIS_LOG = "댓글";

// 1. 댓글 전체 보기
router.get('/', (req, res) => {
    comment.readAll(req.params.blogIdx, req.params.articleIdx).then(({
        code,
        json
    }) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(sC.BAD_REQUEST).send(aU.successFalse(rM.X_READ_ALL_FAIL(THIS_LOG)));
    });
});

// 2. 댓글 하나 보기
router.get('/:commentIdx', (req, res) => {
    comment.readOne(req.params.blogIdx, req.params.articleIdx, req.params.commentIdx).then(({
        code,
        json
    }) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(sC.BAD_REQUEST).send(aU.successFalse(rM.X_READ_FAIL(THIS_LOG)));
    });
});

// 3. 댓글 생성하기
router.post('/', (req, res) => {
    comment.create(req.body, req.params.blogIdx, req.params.articleIdx).then(({
        code,
        json
    }) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(sC.BAD_REQUEST).send(aU.successFalse(rM.X_CREATE_FAIL(THIS_LOG)));
    });
});

// 4. 댓글 수정하기
router.put('/', (req, res) => {
    comment.update(req.body, req.params.blogIdx, req.params.articleIdx).then(({
        code,
        json
    }) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(sC.BAD_REQUEST).send(aU.successFalse(rM.X_UPDATE_FAIL(THIS_LOG)));
    });
});

// 5. 댓글 삭제하기
router.delete('/', (req, res) => {
    comment.delete(req.body, req.params.blogIdx, req.params.articleIdx).then(({
        code,
        json
    }) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(sC.BAD_REQUEST).send(aU.successFalse(rM.X_DELETE_FAIL(THIS_LOG)));
    });
});

router.get('/', function(req, res) {
    res.send('comments');
})

module.exports = router;