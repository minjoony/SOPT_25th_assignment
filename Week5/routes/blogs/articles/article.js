var express = require('express');
var router = express.Router({mergeParams: true});

const rM = require('../../../module/utils/responseMessage');
const aU = require('../../../module/utils/authUtil');
const sC = require('../../../module/utils/statusCode');
const article = require('../../../model/Article');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const THIS_LOG = "게시물";

// 1. 게시물 전체 보기
router.get('/', (req, res) => {
    article.readAll(req.params.blogIdx).then(({
        code,
        json
    }) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(sC.BAD_REQUEST).send(aU.successFalse(rM.X_READ_ALL_SUCCESS(THIS_LOG)));
    });
});

// 2. 게시물 하나 보기
router.get('/:articleIdx', (req, res) => {
    article.readOne(req.params.blogIdx, req.params.articleIdx).then(({
        code,
        json
    }) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(sC.BAD_REQUEST).send(aU.successFalse(rM.X_READ_FAIL(THIS_LOG)));
    });
})

// 3. 게시물 생성하기
router.post('/', upload.array('images', 5), (req, res) => {
    article.create(req.body, req.params.blogIdx, req.files[0].path).then(({
        code,
        json
    }) => {
        res.status(code).send({json,  file: req.files });
    }).catch(err => {
        console.log(err);
        res.status(sC.BAD_REQUEST).send(aU.successFalse(rM.X_DELETE_FAIL(THIS_LOG)));
    });
})

// 4. 게시물 수정하기
router.put('/', (req, res) => {
    article.update(req.body, req.params.blogIdx).then(({
        code,
        json
    }) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(sC.BAD_REQUEST).send(aU.successFalse(rM.X_UPDATE_FAIL(THIS_LOG)));
    });
})

// 5. 게시물 삭제하기
router.delete('/', (req, res) => {
    article.delete(req.body, req.params.blogIdx).then(({
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
    res.send('articles');
});

module.exports = router;