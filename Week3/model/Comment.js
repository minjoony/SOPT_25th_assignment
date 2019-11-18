const sC = require('../module/utils/statusCode');
const rM = require('../module/utils/responseMessage');
const aU = require('../module/utils/authUtil');

const db = require('../module/db/pool');
const commentData = require('../module/data/commentData');

const THIS_LOG = "댓글";

const comment = {
    create: ({
        title,
        content,
        writer,
        date
    }) => {
        return new Promise(async (resolve, reject) => {
            if(!title || !content || !writer || !date) {
                resolve({
                    code: sC.NOT_FOUND,
                    json: aU.successFalse(rM.NULL_VALUE)
                });
                return;
            }
            const postCommentQuery = 'INSERT INTO comment(title, content, writer, date) VALUES(?, ?, ?, ?)';
            const postCommentResult = await db.queryParam_Parse(postCommentQuery, [title, content, writer, date]);

            if(!postCommentResult) {
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
    
    readOne: (commentIdx) => {
        return new Promise(async (resolve, reject) => {
            if(!commentIdx) {
                resolve({
                    code: sC.NOT_FOUND,
                    json: aU.successFalse(rM.NULL_VALUE)
                });
                return;
            }

            const getCommentQuery = 'SELECT * FROM comment WHERE commentIdx = ?';
            const getCommentResult = await db.queryParam_Parse(getCommentQuery, [commentIdx]);

            if(!getCommentResult) {
                resolve({
                    code: sC.NOT_FOUND,
                    json: aU.successFalse(rM.X_READ_FAIL(THIS_LOG))
                });
                return;
            }

            const comment = commentData(getCommentResult[0]);
            resolve({
                code: sC.OK,
                json: aU.successTrue(rM.X_READ_SUCCESS(THIS_LOG), comment)
            });
        });
    },
    readAll: () => {
        return new Promise(async (resolve, reject) => {
            const getAllCommentQuery = 'SELECT * FROM comment';
            const getAllCommentResult = await db.queryParam_Parse(getAllCommentQuery);

            if(!getAllCommentResult) {
                resolve({
                    code: sC.NOT_FOUND,
                    json: aU.successFalse(rM.X_READ_FAIL(THIS_LOG))
                });
                return;
            }

            const commentArr = [];
            getAllCommentResult.forEach((rawComment, index, result) => {
                commentArr.push(commentData(rawComment));
            });

            resolve({
                code: sC.OK,
                json: aU.successTrue(rM.X_READ_ALL_SUCCESS(THIS_LOG), commentArr)
            });
        });
    },

    update: ({
        commentIdx,
        title,
        content,
        writer,
        date
    }) => {
        return new Promise(async (resolve, reject) => {
            if(!commentIdx || !title || !content || !writer || !date) {
                resolve({
                    code: sC.NOT_FOUND,
                    json: aU.successFalse(rM.NULL_VALUE)
                });
                return;
            }

            const putCommentQuery = 'UPDATE comment SET title = ?, content = ?, writer = ?, date = ? WHERE commentIdx = ?';
            const putCommentResult = await db.queryParam_Parse(putCommentQuery, [title, content, writer, date, commentIdx]);
            console.log(putCommentResult);

            if(!putCommentResult) {
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

    delete: ({commentIdx}) => {
        return new Promise(async (resolve, reject) => {
            if(!commentIdx) {
                resolve({
                    code: sC.NOT_FOUND,
                    json: aU.successFalse(rM.NULL_VALUE)
                });
                return;
            }

            const deleteCommentQuery = 'DELETE FROM comment WHERE commentIdx = ?';
            const deleteCommentResult = await db.queryParam_Parse(deleteCommentQuery, [commentIdx]);
            console.log(deleteCommentResult);

            if(!deleteCommentResult) {
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
module.exports = comment;