const authUtil = require('../module/utils/authUtil');
const responseMessage = require('../module/utils/responseMessage');
const statusCode = require('../module/utils/statusCode');

const db = require('../module/db/pool');
const officeData = require('../module/data/officeData');

module.exports = {
    getAll: () => {
        return new Promise(async (resolve, reject) => {
            const getAllOfficeQuery = 'SELECT * FROM office';
            const getAllOfficeResult = await db.queryParam_Parse(getAllOfficeQuery);

            if(getAllOfficeResult.length == 0)
            {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(responseMessage.GET_OFFICE_FAIL)
                })
                return;
            }

            const officeArr = [];

            getAllOfficeResult.forEach((rawBlog, index, result) => {
                officeArr.push(officeData(rawBlog));
            });

            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.GET_OFFICE_SUCCESS)
            });
        });
    }
};