const sC = require('../module/utils/statusCode');
const rM = require('../module/utils/responseMessage');
const aU = require('../module/utils/authUtil');

const db = require('../module/db/pool');
const articleData = require('../module/data/articleData');

const THIS_LOG = '게시물';

const article = {
    create: ({
        title,
        content,
        writer
    }, blogIdx, filePath) => {
        return new Promise(async (resolve, reject) => {
            console.log(title, content, writer);
            if(!title || !content || !writer) {
                resolve({
                    code: sC.BAD_REQUEST,
                    json: aU.successFalse(rM.NULL_VALUE)
                });
                return;
            }
            if(!filePath)
            {
                console.log("null 값");
                filePath = null;
            }

            console.log(filePath);
            const postArticleQuery = 'INSERT INTO article(title, content, writer, blogIdx, image) VALUES(?, ?, ?, ?, ?)';
            const postArticleResult = await db.queryParam_Parse(postArticleQuery, [title, content, writer, blogIdx, filePath]);

            if(!postArticleResult || postArticleResult.length == 0) {
                resolve({
                    code: sC.NOT_FOUND,
                    json: aU.successFalse(rM.X_CREATE_FAIL(THIS_LOG))
                });
                return;
            }

            resolve({
                code: sC.OK,
                json: aU.successTrue(rM.X_CREATE_SUCCESS(THIS_LOG))
            });
        });
    },

    readOne: (blogIdx, articleIdx) => {
        return new Promise(async (resolve, reject) => {
            const getArticleQuery = 'SELECT * FROM article WHERE blogIdx = ? AND articleIdx = ?';
            const getArticleResult = await db.queryParam_Parse(getArticleQuery, [blogIdx, articleIdx]);

            if(!getArticleResult || getArticleResult.length == 0) {
                resolve({
                    code: sC.NOT_FOUND,
                    json: aU.successFalse(rM.X_READ_FAIL(THIS_LOG))
                });
                return;
            }

            const article = articleData(getArticleResult[0]);

            resolve({
                code: sC.OK,
                json: aU.successTrue(rM.X_READ_SUCCESS(THIS_LOG), article)
            });
        });
    },

    readAll: (blogIdx) => {
        return new Promise(async (resolve, reject) => {
            const getAllArticleQuery = 'SELECT * FROM article WHERE blogIdx = ?';
            const getAllArticleResult = await db.queryParam_Parse(getAllArticleQuery, [blogIdx]);

            if(!getAllArticleResult || getAllArticleResult.length == 0) {
                resolve({
                    code: sC.NOT_FOUND,
                    json: aU.successFalse(rM.X_READ_ALL_FAIL(THIS_LOG))
                });
                return;
            }

            const articleArr = [];
            getAllArticleResult.forEach((rawArticle, index, result) => {
                articleArr.push(articleData(rawArticle));
            });

            resolve({
                code: sC.OK,
                json: aU.successTrue(rM.X_READ_ALL_SUCCESS(THIS_LOG), articleArr)
            });
        });
    },
    
    update: ({
        articleIdx,
        title,
        content,
        writer
    }, blogIdx) => {
        return new Promise(async (resolve, reject) => {
            if(!articleIdx || !title || !content || !writer) {
                resolve({
                    code: sC.BAD_REQUEST,
                    json: aU.successFalse(rM.NULL_VALUE)
                });
                return;
            }

            const putArticleQuery = 'UPDATE article SET title = ?, content = ?, writer = ? WHERE blogIdx = ? AND articleIdx = ?';
            const putArticleResult = await db.queryParam_Parse(putArticleQuery, [title, content, writer, blogIdx, articleIdx]);
            console.log(putArticleResult);

            if(!putArticleResult || putArticleResult.length == 0) {
                resolve({
                    code: sC.NOT_FOUND,
                    json: aU.successFalse(rM.X_UPDATE_FAIL(THIS_LOG))
                });
                return;
            }

            resolve({
                code: sC.OK,
                json: aU.successTrue(rM.X_UPDATE_SUCCESS(THIS_LOG))
            });
        });
    },
    
    delete: ({articleIdx}, blogIdx) => {
        return new Promise(async (resolve, reject) => {
            if(!articleIdx) {
                resolve({
                    code: sC.NOT_FOUND,
                    json: aU.successFalse(rM.NULL_VALUE)
                });
                return;
            }

            const deleteArticleQuery = 'DELETE FROM article WHERE blogIdx = ? AND articleIdx = ?';
            const deleteArticleResult = await db.queryParam_Parse(deleteArticleQuery, [blogIdx, articleIdx]);
            console.log(deleteArticleResult);

            if(!deleteArticleResult || deleteArticleResult.length == 0) {
                resolve({
                    code: sC.NOT_FOUND,
                    json: aU.successFalse(rM.X_DELETE_FAIL(THIS_LOG))
                });
                return;
            }

            resolve({
                code: sC.OK,
                json: aU.successTrue(rM.X_DELETE_SUCCESS(THIS_LOG))
            });
        });
    }
}
module.exports = article;