const sC = require('../module/utils/statusCode');
const rM = require('../module/utils/responseMessage');
const aU = require('../module/utils/authUtil');

const db = require('../module/db/pool')
const blogData = require('../module/data/blogData')

const THIS_LOG = '블로그';

const blog = {
    create: ({
        title,
        content,
        writer,
        date
    }) => {
        return new Promise(async (resolve, reject) => {
            console.log(title, content, writer, date);
            if(!title || !content || !writer || !date) {
                resolve({
                    code: sC.NOT_FOUND,
                    json: aU.successFalse(rM.NULL_VALUE)
                });
                return;
            }
        
            const postBlogQuery = 'INSERT INTO blog(title, content, writer, date) VALUES (?, ?, ?, ?)';
            const postBlogResult = await db.queryParam_Parse(postBlogQuery, [title, content, writer, date]);

            //const blog = blogData(postBlogResult[0]);

            if(!postBlogResult || postBlogResult.length == 0) {
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

    readOne: (blogIdx) => { // readOne은 router.get에서 param으로 넘어오므로 변수.
        return new Promise(async (resolve, reject) => {
            const getBlogQuery = 'SELECT * FROM blog WHERE blogIdx = ?';
            const getBlogResult = await db.queryParam_Parse(getBlogQuery, [blogIdx]);

            if(!getBlogResult || getBlogResult.length == 0) {
                resolve({
                    code: sC.NOT_FOUND,
                    json: aU.successFalse(rM.X_READ_FAIL(THIS_LOG))
                });
                return;
            }

            const blog = blogData(getBlogResult[0]);

            resolve({
                code: sC.OK,
                json: aU.successTrue(rM.X_READ_SUCCESS(THIS_LOG), blog)
            });
        });
    },

    readAll: () => {
        return new Promise(async (resolve, reject) => {
            const getAllBlogQuery = "SELECT * FROM blog";
            const getAllBlogResult = await db.queryParam_None(getAllBlogQuery);

            if(!getAllBlogResult || getAllBlogResult.length == 0) {
                resolve({
                    code: sC.NOT_FOUND,
                    json: aU.successFalse(rM.X_READ_ALL_FAIL(THIS_LOG))
                });
                return;
            }

            const blogArr = [];
            getAllBlogResult.forEach((rawBlog, index, result) => {
                blogArr.push(blogData(rawBlog));
            });
            
            resolve({
                code: sC.OK,
                json: aU.successTrue(rM.X_READ_ALL_SUCCESS(THIS_LOG), blogArr)
            });
        });
    },

    update: ({
        blogIdx,
        title,
        content,
        writer,
        date
    }) => {
        return new Promise(async(resolve, reject) => {
            if(!blogIdx || !title || !content || !writer || !date) {
                resolve ({
                    code: sC.NOT_FOUND,
                    json: aU.successFalse(rM.NULL_VALUE)
                });
                return;
            }
            const putBlogQuery = 'UPDATE blog SET title = ?, content = ?, writer = ?, date = ? WHERE blogIdx = ?';
            const putBlogResult = await db.queryParam_Parse(putBlogQuery, [title, content, writer, date, blogIdx])  // 순서 맞아야함
            console.log(putBlogResult);
            if(!putBlogResult || putBlogResult.length == 0) {
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

    delete: ({blogIdx}) => {    // delete은 router.delete에서 body로 넘어오므로 객체.
        return new Promise(async(resolve, reject) => {
            if(!blogIdx) {
                resolve({
                    code: sC.NOT_FOUND,
                    json: aU.successFalse(rM.NULL_VALUE)
                });
                return;
            }
            const deleteBlogQuery = 'DELETE FROM blog WHERE blogIdx = ?';
            const deleteBlogResult = await db.queryParam_Parse(deleteBlogQuery,[blogIdx]);
            console.log(deleteBlogResult);

            if(!deleteBlogResult || deleteBlogResult.length == 0) {
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
module.exports = blog;