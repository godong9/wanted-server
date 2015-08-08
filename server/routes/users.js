var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/User');

/**
 * ---------
 * ## **GET All users**
 *  - 테스트 위해 모든 유저 목록 가져오는 API
 *
 * ### URL: /user/all
 * ### TYPE: GET
 *
 * @example
 *  REQUEST
 *   - GET /user/all
 *  RESPONSE
 *   - {"resultCode":0,"resultMsg":"SUCCESS","data":[{"_id":"55c4dff156556a4108a1c63a","authType":"phone","authKey":"01055595552","name":"godong","createDate":"2015-08-07T16:42:25.396Z","__v":0,"profileUrl":""}]}
 */
router.get('/all', userCtrl.getAllUsers);

/**
 * ---------
 * ## **GET user**
 *  - 유저의 _id로 유저 정보 가져오는 API
 *
 * ### URL: /user/id/:id
 * ### TYPE: GET
 *
 * @example
 *  REQUEST
 *   - GET /user/id/55c4dff156556a4108a1c63a
 *  RESPONSE
 *   - {"resultCode":0,"resultMsg":"SUCCESS","data":{"_id":"55c4dff156556a4108a1c63a","authType":"phone","authKey":"01055595552","name":"godong","createDate":"2015-08-07T16:42:25.396Z","__v":0,"profileUrl":""}}
 */
router.get('/id/:id', userCtrl.getUser);

/**
 * ---------
 * ## **POST user save**
 *  - 회원 가입 API
 *
 * ### URL: /user/save
 * ### TYPE: POST
 *
 * @param {String} authType - phone
 * @param {String} authKey - 핸드폰 번호
 * @param {String} name - 유저 이름
 *
 * @example
 *  REQUEST
 *   - POST /user/save { "authType":"phone", "authKey":"010-5559-5552", "name":"godong9" }
 *  RESPONSE
 *   - {"resultCode":0,"resultMsg":"SUCCESS","data":{"__v":0,"authType":"phone","authKey":"010-5559-5552","name":"godong9","createDate":"2015-08-08T01:40:20.229Z","_id":"55c55e045b3524fc02d35863","profileUrl":""}}
 */
router.post('/save', userCtrl.saveUser);

/**
 * ---------
 * ## **POST user login**
 *  - 로그인 API
 *
 * ### URL: /user/login
 * ### TYPE: POST
 *
 * @param {String} authType - phone
 * @param {String} authKey - 핸드폰 번호
 *
 * @example
 *  REQUEST
 *   - POST /user/login { "authType":"phone", "authKey":"010-5559-5552" }
 *  RESPONSE
 *   - {"resultCode":0,"resultMsg":"SUCCESS","data":{"_id":"55c55e045b3524fc02d35863","authType":"phone","authKey":"010-5559-5552","name":"godong9","createDate":"2015-08-08T01:40:20.229Z","__v":0,"profileUrl":""}}
 */
router.post('/login', userCtrl.loginUser);

module.exports = router;
