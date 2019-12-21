const authUtil = require('../module/utils/authUtil');
const responseMessage = require('../module/utils/responseMessage');
const statusCode = require('../module/utils/statusCode');

const db = require('../module/db/pool');
const userData = require('../module/data/userData');

module.exports = {
    signin: (userId, userPwd) => {
        return new Promise(async (resolve, reject) => {
            const getUserQuery = 'SELECT * FROM user WHERE userId = ? AND userPwd = ?';
            const getUserResult = await db.queryParam_Parse(getUserQuery, [userId, userPwd]);

            // User Data에 해당 정보가 없으면 존재하지 않는 회원인지, 비밀번호를 틀렸는지 조회
            if(!getUserResult || getUserResult.length == 0)
            {
                const getUserIdQuery = 'SELECT * FROM user WHERE userId = ?';
                const getUserIdResult = await db.queryParam_Parse(getUserIdQuery, [userId]);
                const getUserPwdQuery = 'SELECT * FROM user WHERE userPwd = ?';
                const getUserPwdResult = await db.queryParam_Parse(getUserPwdQuery, [userPwd]);

                // 존재하지 않는 유저인 경우
                if(!getUserIdResult || getUserIdResult.length == 0)
                {
                    resolve({
                        code: statusCode.NOT_FOUND,
                        json: authUtil.successFalse(responseMessage.NO_USER)
                    })
                    return;
                }

                // 비밀번호 입력이 틀린 경우
                else if(!getUserPwdResult || getUserPwdResult.length == 0)
                {
                    resolve({
                        code: sC.NOT_FOUND,
                        json: aU.successFalse(rM.MISS_MATCH_PW)
                    })
                    return;
                }

                // 나머지 경우
                else
                {
                    resolve({
                        code: sC.NOT_FOUND,
                        json: aU.successFalse(rM.SIGN_IN_FAIL)
                    });
                    return;
                }
            }

            // 로그인 성공
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.SIGN_IN_SUCCESS)
            })
        })
    },

    signup: (userId, userPwd) => {
        return new Promise(async (resolve, reject) => {
            const checkIdQuery = 'SELECT userId FROM user WHERE userId = ?';
            const checkIdResult = await db.queryParam_Parse(checkIdQuery, [userId]);

            // ID 중복시 Fail
            if(checkIdResult.length != 0)
            {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(responseMessage.ALREADY_ID)
                });
                return;
            }

            const signupUserQuery = 'INSERT INTO user(userId, userPwd) VALUES(?, ?)';
            const signupUserResult = await db.queryParam_Parse(signupUserQuery, [userId, userPwd]);

            if(!signupUserResult || signupUserResult.length == 0) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(responseMessage.SIGN_UP_FAIL)
                });
                return;
            }

            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.SIGN_UP_SUCCESS)
            });
        })
    },

    userget: (userIdx) => {
        return new Promise(async (resolve, reject) => {
            const getUserQuery = 'SELECT * FROM user WHERE userIdx = ?';
            const getUserResult = await db.queryParam_Parse(getUserQuery, [userIdx]);

            if(getUserResult.length == 0)
            {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(responseMessage.GET_USER_FAIL)
                });
                return;
            }

            const user = userData(getUserResult[0]);

            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.GET_USER_SUCCESS, blog)
            });
        })
    }
};