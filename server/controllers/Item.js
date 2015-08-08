var mongoose = require('mongoose');
var Item = mongoose.model('Item');
var Result = require('../services/Result');
var async = require('async');

function ItemCtrl() {

}

/**
 *
 * @param req
 * @param res
 * @returns {*}
 */
ItemCtrl.getItems = function(req, res) {
    var errors, criteria, projection;
    req.checkQuery('location.lat', 'Invalid location').notEmpty();
    req.checkQuery('location.lng', 'Invalid location').notEmpty();
    errors = req.validationErrors();
    if (errors) return res.status(400).send(Result.ERROR(errors));
    criteria = {};
    projection = { itemImgUrl:1, category:1, name:1, location:1, lostDate:1 };
    options = {};
    Item.getItems({}, function(err, docs) {
        if (err) return res.status(400).send(Result.ERROR(err));
        res.status(200).send(Result.SUCCESS(docs));
    });
};


module.exports = ItemCtrl;
