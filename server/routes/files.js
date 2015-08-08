var express = require('express');
var router = express.Router();
var fileCtrl = require('../controllers/File');

var FILE_UPLOAD_LIMIT_SIZE = 10 * 1024 * 1024; // 10mb

/**
 * ---------
 * ## **POST file upload**
 *  - 파일 업로드 API
 *
 * ### URL: /file
 * ### TYPE: POST
 *
 * @param {Form} 파일 데이터
 *
 * @example
 *  REQUEST
 *   - POST /file
 *  RESPONSE
 *   - {"resultCode":0,"resultMsg":"SUCCESS","data":"/upload/1438999692440_gd.png"}
 */
router.route('/').post(fileCtrl.checkFileSize(FILE_UPLOAD_LIMIT_SIZE), fileCtrl.run);

module.exports = router;
