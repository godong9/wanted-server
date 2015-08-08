var express = require('express');
var router = express.Router();
var itemCtrl = require('../controllers/Item');

/**
 * ---------
 * ## **GET items**
 *  - 현재 위치 주변 item 목록 가져오는 API
 *
 * ### URL: /item/list
 * ### TYPE: POST
 *
 * @param {JSONObject} location: 현재 위치 데이터
 * @param {String} location.lat: 현재 위치 위도
 * @param {String} pageNum: 페이지 번호 (0부터 시작)
 * @param {String} perPage: 페이지당 가져올 개수
 *
 * @example
 *  REQUEST
 *   - GET /item/list?pageNum=0&perPage=10&location={"lat":37.497942,"lng":127.02762099999995}
 *  RESPONSE
 *   -
 */
router.get('/item/list', itemCtrl.getItems);


module.exports = router;
