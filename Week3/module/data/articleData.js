module.exports =
    (origin_articleData) => {
        articleData = {
            "articleIdx" : origin_articleData.articleIdx,
            "title" : origin_articleData.title,
            "content" : origin_articleData.content,
            "writer" : origin_articleData.writer,
        }
        return articleData;
    }