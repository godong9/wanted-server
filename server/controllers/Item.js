var mongoose = require('mongoose');
var Item = mongoose.model('Item');
var Result = require('../services/Result');
var GoogleApi = require('../services/GoogleApi');
var async = require('async');
var _ = require('underscore');
var log4js = require('log4js');
var logger = log4js.getLogger("ItemCtrl");

function ItemCtrl() {

}

ItemCtrl.getAllItems = function(req, res) {
    Item.getItems({}, function(err, docs) {
        if (err) return res.status(400).send(Result.ERROR(err));
        res.status(200).send(Result.SUCCESS(docs));
    });
};

ItemCtrl.getItems = function(req, res) {
    var errors, criteria, projection, options;
    req.checkQuery('pageNum', 'Invalid pageNum').notEmpty();
    req.checkQuery('perPage', 'Invalid perPage').notEmpty();
    errors = req.validationErrors();
    if (errors) return res.status(400).send(Result.ERROR(errors));
    criteria = {};
    if (!_.isUndefined(req.query.location)) {
        req.query.location = JSON.parse(req.query.location);
        criteria["location.loc"]= {
            $near : {
                $geometry : {
                    type : "Point" ,
                    coordinates : [ req.query.location.lng, req.query.location.lat ]
                }
            }
        };
    }
    projection = { userName:1, itemImgUrl:1, category:1, name:1, location:1, lostDate:1 };
    options = {
        skip: parseInt(req.query.pageNum) * parseInt(req.query.perPage),
        limit: parseInt(req.query.perPage)
    };
    async.waterfall([
        function(callback) {
            if (!_.isUndefined(req.query.address)) {
                GoogleApi.getGeocode(req.query.address, function(err, locationInfo) {
                    if (err) return callback(err);
                    logger.debug("locationInfo.geometry.viewport: ", locationInfo.geometry.viewport);
                    if (locationInfo.geometry && locationInfo.geometry.viewport) {
                        var northEast = locationInfo.geometry.viewport.northeast;
                        var southWest = locationInfo.geometry.viewport.southwest;
                        var left = southWest.lat;
                        var right = northEast.lat;
                        var top = northEast.lng;
                        var bottom = southWest.lng;
                        criteria["location.loc"] = {
                            $geoWithin : {
                                $geometry: {
                                    type : "Polygon" ,
                                    coordinates: [[[top,left],[top,right],[bottom,right],[bottom,left],[top,left]]]
                                }
                            }
                        };
                        callback(null);
                    } else {
                        callback("invalid location");
                    }
                });
            } else {
                callback(null);
            }
        },
        function(callback) {
            Item.getItems(criteria, projection, options, function(err, docs) {
                callback(err, docs);
            });
        }
    ], function (err, result) {
        logger.debug(err);
        if (err === "invalid location") return res.status(200).send(Result.SUCCESS([]));
        if (err) return res.status(400).send(Result.ERROR(err));
        res.status(200).send(Result.SUCCESS(result));
    });

};

ItemCtrl.getItem = function(req, res) {
    var errors, criteria;
    req.checkParams('id', 'Invalid id').notEmpty();
    errors = req.validationErrors();
    if (errors) return res.status(400).send(Result.ERROR(errors));
    criteria = { _id: req.params.id };
    Item.getItem(criteria, function(err, doc) {
        if (err) return res.status(400).send(Result.ERROR(err));
        res.status(200).send(Result.SUCCESS(doc));
    });
};

ItemCtrl.saveItem = function(req, res) {
    var errors, doc;
    console.log(req.body);
    req.checkBody('userId', 'Invalid userId').notEmpty();
    req.checkBody('userName', 'Invalid userName').notEmpty();
    req.checkBody('itemImgUrl', 'Invalid itemImgUrl').notEmpty();
    req.checkBody('category', 'Invalid category').notEmpty();
    req.checkBody('name', 'Invalid name').notEmpty();
    req.checkBody('type', 'Invalid type').notEmpty();
    req.checkBody('cost', 'Invalid cost').notEmpty();
    req.checkBody('feature', 'Invalid feature').notEmpty();
    req.checkBody('phone', 'Invalid phone').notEmpty();
    req.checkBody('location.lat', 'Invalid location.lat').notEmpty();
    req.checkBody('location.lng', 'Invalid location.lng').notEmpty();
    req.checkBody('lostDate', 'Invalid lostDate').notEmpty();
    errors = req.validationErrors();
    if (errors) return res.status(400).send(Result.ERROR(errors));
    doc = {
        userId: req.body.userId,
        userName: req.body.userName,
        itemImgUrl: req.body.itemImgUrl,
        category: req.body.category,
        name: req.body.name,
        type: req.body.type,
        cost: req.body.cost,
        feature: req.body.feature,
        phone: req.body.phone,
        location: {
            loc: {
                type: "Point",
                coordinates: [
                    req.body.location.lng,
                    req.body.location.lat
                ]
            }
        },
        lostDate: req.body.lostDate
    };
    if (req.body.detail1) doc.detail1 = req.body.detail1;
    if (req.body.detail2) doc.detail2 = req.body.detail2;
    Item.saveItem(doc, function(err, doc) {
        if (err) return res.status(400).send(Result.ERROR(err));
        res.status(200).send(Result.SUCCESS(doc));
    });
};

module.exports = ItemCtrl;
