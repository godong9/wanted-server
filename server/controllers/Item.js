var mongoose = require('mongoose');
var Item = mongoose.model('Item');
var Result = require('../services/Result');
var async = require('async');

function ItemCtrl() {

}

ItemCtrl.getItems = function(req, res) {
    var errors, criteria, projection, options;
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


module.exports = ItemCtrl;
