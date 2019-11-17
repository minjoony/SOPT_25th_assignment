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
    }) => {
        return new Promise(async (resolve, reject) => {
            console.log(title, content, writer);
            if(!title || !content || !writer) {
                resolve({
                    code: sC.BAD_REQUEST,
                    json: aU.successFalse(rM.NULL_VALUE)
                });
                return;
            }

            const postArticleQuery = 'INSERT INTO article(title, content, writer) VALUES(?, ?, ?)';
            const postArticleResult = await db.queryParam_Parse(postArticleQuery, [title, content, writer]);

            if(!postArticleResult) {
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

    readOne: (articleIdx) => {
        return new Promise(async (resolve, reject) => {
            const getArticleQuery = 'SELECT * FROM article WHERE articleIdx = ?';
            const getArticleResult = await db.queryParam_Parse(getArticleQuery, [articleIdx]);

            if(!getArticleResult) {
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

    readAll: () => {
        return new Promise(async (resolve, reject) => {
            const getAllArticleQuery = 'SELECT * FROM article';
            const getAllArticleResult = await db.queryParam_Parse(getAllArticleQuery);

            if(!getAllArticleResult) {
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
    }) => {
        return new Promise(async (resolve, reject) => {
            if(!articleIdx || !title || !content || !writer) {
                resolve({
                    code: sC.BAD_REQUEST,
                    json: aU.successFalse(rM.NULL_VALUE)
                });
                return;
            }

            const putArticleQuery = 'UPDATE article SET title = ?, content = ?, writer = ? WHERE articleIdx = ?';
            const putArticleResult = await db.queryParam_Parse(putArticleQuery, [title, content, writer, articleIdx]);
            console.log(putArticleResult);

            if(!putArticleResult) {
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
    
    delete: ({articleIdx}) => {
        return new Promise(async (resolve, reject) => {
            if(!articleIdx) {
                resolve({
                    code: sC.NOT_FOUND,
                    json: aU.successFalse(rM.NULL_VALUE)
                });
                return;
            }

            const deleteArticleQuery = 'DELETE FROM article WHERE articleIdx = ?';
            const deleteArticleResult = await db.queryParam_Parse(deleteArticleQuery, [articleIdx]);
            console.log(deleteArticleResult);

            if(!deleteArticleResult) {
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