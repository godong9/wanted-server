var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    async = require('async');

/**
 * Item Schema
 */
var ItemSchema = new Schema({
    userId: { type: String, required: true }, // 등록한 유저 id
    userName: { type: String, required: true }, // 등록한 유저 name
    itemImgUrl: { type: String, default: '' }, // 등록한 사진 URL
    category: { type: Number, required: true }, // 1: 애완동물, 2: 분실물
    name: { type: String, required: true }, // 분실물 이름
    type: { type: String, required: true }, // 분실물 종류
    cost: { type: String, required: true }, // 사례금
    feature: { type: String, required: true }, // 특징
    phone: { type: String, required: true }, // 연락처
    location: { // 분실한 위치
        city: String, // 도시
        loc: {} // 위치 정보
    },
    detail1: { type: String, default: '' },
    detail2: { type: String, default: '' },
    lostDate: { type: Date, required: true }, // 분실한 시간
    createDate: { type: Date, required: true } // 생성 시간
}, { collection: 'item' });

ItemSchema.index({ user: 1 });

/**
 * Model Methods
 */

ItemSchema.statics.getItems = function(criteria, projection, options, callback) {
    this.find(criteria, projection, options, callback);
};

ItemSchema.statics.getItem = function(criteria, projection, options, callback) {
    this.findOne(criteria, projection, options, callback);
};

ItemSchema.statics.saveItem = function(doc, callback) {
    if (!doc) return;
    doc.lostDate = doc.lostDate ? new Date(doc.lostDate) : new Date();
    doc.createDate = doc.createDate ? doc.createDate : new Date();

    this.create(doc, callback);
};

ItemSchema.statics.updateItem = function(conditions, doc, callback) {
    if (!conditions || !doc) return;

    this.update(conditions, doc, callback);
};

ItemSchema.statics.deleteItem = function(criteria, callback) {
    if (!criteria) return;

    this.remove(criteria, callback);
};


module.exports = mongoose.model('Item', ItemSchema);