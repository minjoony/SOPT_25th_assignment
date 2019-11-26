const aU = require('../module/utils/authUtil');
const sC = require('../module/utils/statusCode');
const rM = require('../module/utils/responseMessage');

const db = require('../module/db/pool');
const userData = require('../module/data/userData');


module.exports = {
    signin: (id, pwd) => {
        return new Promise((resolve, reject) => {
            // 유저가 존재하는지 체크
            /*
            const user = userData.find(it => it.id == id);
            console.log(user);

            if(!user) {
                resolve({
                    code: sC.BAD_REQUEST,
                    json: aU.successFalse(rM.NO_USER)
                });
                return;
            }
            */
            const getUserQuery = 'SELECT * FROM user WHERE userId = ? AND userPwd = ?';
            const getUserResult = await db.queryParam_Parse(getUserQuery, [id, pwd]);

            if(!getUserResult) {
                resolve({
                    code: sC.NOT_FOUND,
                    json: aU.successFalse(rM.SIGN_IN_FAIL)
                });
                return;
            }

            const user = userData(getUserResult[0]);

            // 비밀번호 체크
            if(user.userPwd != pwd) {
                resolve({
                    code: sC.BAD_REQUEST,
                    json: aU.successFalse(rM.MISS_MATCH_PW)
                });
                return;
            }

            // 로그인 성공
            resolve({
                code: sC.OK,
                json: aU.successTrue(rM.SIGN_IN_SUCCESS)
            });
        })
    },

    signup: (id, pwd) => {
        return new Promise((resolve, reject) => {
            // 아이디 중복 체크
            if(userData.filter(it => it.id == id).length > 0) {
                resolve({
                    code: sC.BAD_REQUEST,
                    json: aU.successFalse(rM.ALREADY_ID)
                });     
                return;
            }
          
            const signupUserQuery = 'INSERT INTO user(id, pwd) VALUES(?, ?)';
            const signupUserResult = await db.queryParam_Parse(signupUserQuery, [id, pwd]);

            if(!signupUserResult) {
                resolve({
                    code: sC.NOT_FOUND,
                    json: aU.successFalse(rM.SIGN_UP_FAIL)
                });
                return;
            }

            resolve({
                code: sC.OK,
                json: aU.successTrue(rM.SIGN_UP_SUCCESS)
            });
        })
    }
}