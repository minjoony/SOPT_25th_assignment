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
            if(!title || !content || !writer || !date) {
                resolve({
                    code: sC.NOT_FOUND,
                    json: aU.successFalse(rM.NULL_VALUE)
                });
            }
        
            const postBlogQuery = 'INSERT INTO blog(title, content, writer, date) VALUES (?, ?, ?, ?)';
            const postBlogResult = await db.queryParam_Parse(postBlogQuery, [title, content, writer, date]);

            if(!postBlogResult) {
                resolve({
                    code: sC.NOT_FOUND,
                    json: aU.successFalse(rM.X_CREATE_FAIL(THIS_LOG))
                });
            }

            resolve({
                code: sC.OK,
                json: aU.successTrue(rM.X_CREATE_SUCCESS(THIS_LOG))
            });
        });
    },

    read: (blogIdx) => {
        return new Promise(async (resolve, reject) => {
            const getBlogQuery = 'SELECT * FROM blog WHERE blogIdx = ?';
            const getBlogResult = await db.queryParam_Parse(getBlogQuery, [blogIdx]);

            if(!getBlogResult) {    //if(getBlogResult.length == 0) { ???
                resolve({
                    code: sC.NOT_FOUND,
                    json: aU.successFalse(rM.X_READ_FAIL(THIS_LOG))
                });
            }

            const blog = blogData(getBlogResult); //const blog = blogData(getBlogResult[0]);

            resolve({
                code: sC.OK,
                json: aU.successTrue(rM.X_READ_SUCCESS(THIS_LOG))
            });
        });
    },

    readAll: () => {
        return new Promise(async (resolve, reject) => {
            const getAllBlogQuery = "SELECT * FROM blog";
            const getAllBlogResult = await db.queryParam_None(getAllBlogQuery);

            if(!getAllBlogResult) {
                resolve({
                    code: sC.NOT_FOUND,
                    json: aU.successFalse(rM.X_READ_ALL_FAIL(THIS_LOG))
                });
            }

            const blogArr = [];
            getAllBlogResult.forEach((rawBlog, index, result) => {
                blogArr.push(blogData(rawBlog));
            });
            
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.X_READ_ALL_SUCCESS(THIS_LOG), blogArr)
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
            }
            const putBlogQuery = 'UPDATE blog SET title = ?, content = ?, writer = ?, date = ? WHERE blogIdx = ?';
            const putBlogResult = await db.queryParam_Parse(putBlogQuery, [blogIdx, title, content, writer, date])
            console.log(putBlogResult);
            if(!putBlogResult) {
                resolve({
                    code: sC.NOT_FOUND,
                    json: aU.successFalse(rM.X_UPDATE_FAIL(THIS_LOG))
                });
            }

            resolve({
                code: sC.OK,
                json: aU.successTrue(rM.X_UPDATE_SUCCESS(THIS_LOG))
            });
        });
    },

    remove: (body) => {
        return new Promise(async(resolve, reject) => {
            const deleteBlogQuery = 'DELETE FROM blog WHERE blogIdx = ?';
            const deleteBlogResult = await db.queryParam_Parse(deleteBlogQuery,[body.blogIdx]);
            console.log(deleteBlogResult);

            if(!deleteBlogResult) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(responseMessage.X_DELETE_FAIL(THIS_LOG))
                });
            }

            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.X_DELETE_SUCCESS(THIS_LOG))
            });
        });
    }
}
module.exports = blog;