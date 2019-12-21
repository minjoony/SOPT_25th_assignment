module.exports =
    (origin_userData) => {
        userData = {
            "userIdx" : origin_userData.userIdx,
            "userId" : origin_userData.userId,
            "userPwd" : origin_userData.userPwd
        }
        return userData;
    }