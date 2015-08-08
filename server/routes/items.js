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
 *   - GET /item/all
 *  RESPONSE
 *   - {"resultCode":0,"resultMsg":"SUCCESS","data":[{"_id":"55c62a78495ee34905ce51f2","userId":"55c55e045b3524fc02d35863","userName":"godong9","category":1,"name":"뽀삐","type":"강아지","cost":"10만원","feature":"잘 짖음","phone":"godong9(카톡)","lostDate":"2015-08-08T00:00:00.000Z","createDate":"2015-08-08T16:12:40.767Z","__v":0,"detail2":"성별은 수컷","detail1":"품종은 치와와","location":{"loc":{"type":"Point","coordinates":[127.02762099999995,37.497942]}},"itemImgUrl":"http://localhost:3000/upload/1438999692440_gd.png"}]}
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
 *   - GET /item/list?pageNum=0&perPage=10&address=서울시
 *   - GET /item/list?pageNum=0&perPage=10&address=부산시
 *  RESPONSE
 *   - {"resultCode":0,"resultMsg":"SUCCESS","data":[{"_id":"55c62a78495ee34905ce51f2","userName":"godong9","category":1,"name":"뽀삐","lostDate":"2015-08-08T00:00:00.000Z","location":{"loc":{"type":"Point","coordinates":[127.02762099999995,37.497942]}},"itemImgUrl":"http://localhost:3000/upload/1438999692440_gd.png"}]}
 *   - {"resultCode":0,"resultMsg":"SUCCESS","data":[{"_id":"55c62a78495ee34905ce51f2","userName":"godong9","category":1,"name":"뽀삐","lostDate":"2015-08-08T00:00:00.000Z","location":{"loc":{"type":"Point","coordinates":[127.02762099999995,37.497942]}},"itemImgUrl":"http://localhost:3000/upload/1438999692440_gd.png"}]}
 *   - {"resultCode":0,"resultMsg":"SUCCESS","data":[]}
 */
router.get('/list', itemCtrl.getItems);

/**
 * ---------
 * ## **GET item**
 *  - id로 item 상세 정보 가져오는 API
 *
 * ### URL: /item/id/:id
 * ### TYPE: GET
 *
 * @example
 *  REQUEST
 *   - GET /item/id/55c62a78495ee34905ce51f2
 *  RESPONSE
 *   - {"resultCode":0,"resultMsg":"SUCCESS","data":{"_id":"55c62a78495ee34905ce51f2","userId":"55c55e045b3524fc02d35863","userName":"godong9","category":1,"name":"뽀삐","type":"강아지","cost":"10만원","feature":"잘 짖음","phone":"godong9(카톡)","lostDate":"2015-08-08T00:00:00.000Z","createDate":"2015-08-08T16:12:40.767Z","__v":0,"detail2":"성별은 수컷","detail1":"품종은 치와와","location":{"loc":{"type":"Point","coordinates":[127.02762099999995,37.497942]}},"itemImgUrl":"http://localhost:3000/upload/1438999692440_gd.png"}}
 */
router.get('/id/:id', itemCtrl.getItem);

/**
 * ---------
 * ## **POST save item**
 *  - item 저장하는 API
 *
 * ### URL: /item/save
 * ### TYPE: POST
 *
 * @param {String} userId: 유저 ID
 * @param {String} userName: 유저 name
 * @param {String} itemImgUrl: 아이템 이미지 URL
 * @param {String} category: 아이템 카테고리 (1: 동물, 2: 분실물)
 * @param {String} name: 분실물 이름
 * @param {String} type: 분실물 종류
 * @param {String} cost: 사례금
 * @param {String} feature: 특징
 * @param {String} phone: 연락처
 * @param {String} location: 분실한 위치
 * @param {String} detail1: 카테고리1일 때 성별, 카테고리2일 때 색상
 * @param {String} detail2: 카테고리1일 때 품종, 카테고리2일 때 크기
 * @param {String} lostDate: 분실한 날짜 (2015-08-08)
 *
 * @example
 *  REQUEST
 *   - POST { "userId":"55c55e045b3524fc02d35863", "userName": "godong9", "itemImgUrl": "http://localhost:3000/upload/1438999692440_gd.png", "category": 1, "name": "뽀삐", "type":"강아지", "cost":"10만원", "feature":"잘 짖음", "phone": "godong9(카톡)", "location": {"lat":37.497942,"lng":127.02762099999995}, "lostDate": "2015-08-08", "detail1": "품종은 치와와", "detail2":"성별은 수컷" }
 *  RESPONSE
 *   - {"resultCode":0,"resultMsg":"SUCCESS","data":{"__v":0,"userId":"55c55e045b3524fc02d35863","userName":"godong9","category":1,"name":"뽀삐","type":"강아지","cost":"10만원","feature":"잘 짖음","phone":"godong9(카톡)","lostDate":"2015-08-08T00:00:00.000Z","createDate":"2015-08-08T16:12:40.767Z","_id":"55c62a78495ee34905ce51f2","detail2":"성별은 수컷","detail1":"품종은 치와와","location":{"loc":{"coordinates":[127.02762099999995,37.497942],"type":"Point"}},"itemImgUrl":"http://localhost:3000/upload/1438999692440_gd.png"}}
 */
router.post('/save', itemCtrl.saveItem);


module.exports = router;
