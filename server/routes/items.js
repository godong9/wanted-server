var express = require('express');
var router = express.Router();
var itemCtrl = require('../controllers/Item');

/**
 * ---------
 * ## **GET items**
 *  - 현재 위치 주변 item 목록 가져오는 API
 *
 * ### URL: /item/list
 * ### TYPE: GET
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
router.get('/list', itemCtrl.getItems);

/**
 * ---------
 * ## **POST save item**
 *  - item 저장하는 API
 *
 * ### URL: /item/save
 * ### TYPE: POST
 *
 * @param {String} userId: 유저 ID
 * @param {String} itemImgUrl: 아이템 이미지 URL
 * @param {String} category: 아이템 카테고리 (1: 애완동물, 2: 분실물)
 * @param {String} name: 분실물 이름
 * @param {String} detail: 추가 설명
 * @param {String} phone: 연락처
 * @param {String} location: 분실한 위치
 * @param {String} lostDate: 분실한 날짜 (2015-08-08)
 *
 * @example
 *  REQUEST
 *   - POST {}
 *  RESPONSE
 */
router.post('/save', itemCtrl.saveItem);


module.exports = router;
