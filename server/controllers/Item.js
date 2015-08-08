var mongoose = require('mongoose');
var Item = mongoose.model('Item');
var Result = require('../services/Result');
var async = require('async');

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
    req.query.location = JSON.parse(req.query.location);
    req.checkQuery('location.lat', 'Invalid location.lat').notEmpty();
    req.checkQuery('location.lng', 'Invalid location.lng').notEmpty();
    req.checkQuery('pageNum', 'Invalid pageNum').notEmpty();
    req.checkQuery('perPage', 'Invalid perPage').notEmpty();
    errors = req.validationErrors();
    if (errors) return res.status(400).send(Result.ERROR(errors));
    criteria = {};
    criteria["location.loc"]= {
        $near : {
            $geometry : {
                type : "Point" ,
                coordinates : [ req.query.location.lng, req.query.location.lat ]
            }
        }
    };
    projection = { itemImgUrl:1, category:1, name:1, location:1, lostDate:1 };
    options = {
        skip: parseInt(req.query.pageNum) * parseInt(req.query.perPage),
        limit: parseInt(req.query.perPage)
    };
    Item.getItems(criteria, projection, options, function(err, docs) {
        if (err) return res.status(400).send(Result.ERROR(err));
        res.status(200).send(Result.SUCCESS(docs));
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
    req.checkBody('userId', 'Invalid userId').notEmpty();
    req.checkBody('itemImgUrl', 'Invalid itemImgUrl').notEmpty();
    req.checkBody('category', 'Invalid category').notEmpty();
    req.checkBody('name', 'Invalid name').notEmpty();
    req.checkBody('detail', 'Invalid detail').notEmpty();
    req.checkBody('phone', 'Invalid phone').notEmpty();
    req.checkBody('location.lat', 'Invalid location.lat').notEmpty();
    req.checkBody('location.lng', 'Invalid location.lng').notEmpty();
    req.checkBody('lostDate', 'Invalid lostDate').notEmpty();
    errors = req.validationErrors();
    if (errors) return res.status(400).send(Result.ERROR(errors));
    doc = {
        userId: req.body.userId,
        itemImgUrl: req.body.itemImgUrl,
        category: req.body.category,
        name: req.body.name,
        detail: req.body.detail,
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
    Item.saveItem(doc, function(err, doc) {
        if (err) return res.status(400).send(Result.ERROR(err));
        res.status(200).send(Result.SUCCESS(doc));
    });
};

module.exports = ItemCtrl;
