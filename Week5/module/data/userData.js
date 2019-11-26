module.exports =
    (origin_userData) => {
        userData = {
            "userIdx" : origin_commentData.userIdx,
            "userId" : origin_commentData.userId,
            "userPwd" : origin_commentData.userPwd
        }
        return userData;
    }