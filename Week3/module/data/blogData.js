module.exports =
    (origin_blogData) => {
        blogData = {
            "blogIdx" : origin_blogData.blogIdx,
            "title" : origin_blogData.title,
            "content" : origin_blogData.content,
            "writer" : origin_blogData.writer,
            "date" : origin_blogData.date
        }
        return blogData;
    }