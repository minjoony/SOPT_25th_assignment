module.exports =
    (origin_commentData) => {
        commentData = {
            "commentIdx" : origin_commentData.commentIdx,
            "title" : origin_commentData.title,
            "content" : origin_commentData.content,
            "writer" : origin_commentData.writer,
            "date" : origin_commentData.date,
            "blogIdx" : origin_commentData.blogIdx,
            "articleIdx" : origin_commentData.articleIdx
        }
        return commentData;
    }