var express = require('express');
var router = express.Router();
var itemCtrl = require('../controllers/Item');

/**
 * ---------
 * ## **GET All items**
 *  - 테스트 위해 모든 item 목록 가져오는 API
 *
 * ### URL: /list/all
 * ### TYPE: GET
 *
 * @example
 *  REQUEST
 *   - GET /list/all
 *  RESPONSE
 *   - {"resultCode":0,"resultMsg":"SUCCESS","data":[{"_id":"55c5999b6115baa609372b19","userId":"55c55e045b3524fc02d35863","category":1,"name":"뽀삐(치와와)","lostDate":"2015-08-08T00:00:00.000Z","createDate":"2015-08-08T05:54:35.250Z","__v":0,"location":{"loc":{"type":"Point","coordinates":[127.02762099999995,37.497942]}},"phone":"godong9(카톡)","detail":"우리 뽀삐를 찾아주세요ㅠ","itemImgUrl":"/upload/1438999692440_gd.png"}]}
 */
router.get('/all', itemCtrl.getAllItems);

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
 *   - GET /item/list?pageNum=0&perPage=10&location={%22lat%22:37.497942,%22lng%22:127.02762099999995}
 *  RESPONSE
 *   - {"resultCode":0,"resultMsg":"SUCCESS","data":[{"_id":"55c5999b6115baa609372b19","category":1,"name":"뽀삐(치와와)","lostDate":"2015-08-08T00:00:00.000Z","location":{"loc":{"type":"Point","coordinates":[127.02762099999995,37.497942]}},"itemImgUrl":"/upload/1438999692440_gd.png"}]}
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
 *   - POST { "userId": "55c55e045b3524fc02d35863", "itemImgUrl": "/upload/1438999692440_gd.png", "category": 1, "name": "뽀삐(치와와)", "detail": "우리 뽀삐를 찾아주세요ㅠ", "phone": "godong9(카톡)", "location": {"lat":37.497942,"lng":127.02762099999995}, "lostDate": "2015-08-08" }
 *  RESPONSE
 *   - {"resultCode":0,"resultMsg":"SUCCESS","data":{"__v":0,"userId":"55c55e045b3524fc02d35863","category":1,"name":"뽀삐(치와와)","lostDate":"2015-08-08T00:00:00.000Z","createDate":"2015-08-08T05:52:50.681Z","_id":"55c599326115baa609372b18","location":{"loc":{"coordinates":[127.02762099999995,37.497942],"type":"Point"}},"phone":"godong9(카톡)","detail":"우리 뽀삐를 찾아주세요ㅠ","itemImgUrl":"/upload/1438999692440_gd.png"}}
 */
router.post('/save', itemCtrl.saveItem);


module.exports = router;
