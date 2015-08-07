var express = require('express');
var router = express.Router();
var fileCtrl = require('../controllers/File');

var FILE_UPLOAD_LIMIT_SIZE = 10 * 1024 * 1024; // 10mb

/** POST file upload **/
router.route('/').post(fileCtrl.checkFileSize(FILE_UPLOAD_LIMIT_SIZE), fileCtrl.run);

module.exports = router;
