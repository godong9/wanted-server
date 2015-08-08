var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    async = require('async');

/**
 * User Schema
 */
var UserSchema = new Schema({
    authType: { type: String, required: true }, // 인증타입
    authKey: { type: String, required: true }, // 인증키
    name: { type: String, required: true }, // 닉네임
    profileImgUrl: { type: String, default: '' }, // 프로필 이미지 URL
    createDate: { type: Date, required: true } // 생성 시간
}, { collection: 'user' });

UserSchema.index({ name: 1 }, { unique: true });

/**
 * Model Methods
 */

UserSchema.statics.getUser = function(criteria, projection, options, callback) {
    this.findOne(criteria, projection, options, callback);
};

UserSchema.statics.getUsers = function(criteria, projection, options, callback) {
    this.find(criteria, projection, options, callback);
};

UserSchema.statics.saveUser = function(doc, callback) {
    if (!doc) return;
    doc.createDate = doc.createDate ? doc.createDate : new Date();

    this.findOne({ name: doc.name }, function(err, doc) {
        if (err) return callback(err);
        if (doc.name) return callback('already exist user');
        this.create(doc, callback);
    });
};

module.exports = mongoose.model('User', UserSchema);