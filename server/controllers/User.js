var mongoose = require('mongoose');
var User = mongoose.model('User');
var Result = require('../services/Result');
var async = require('async');

function UserCtrl() {

}

UserCtrl.getAllUsers = function(req, res) {
    User.getUsers({}, function(err, docs) {
        if (err) return res.status(400).send(Result.ERROR(err));
        res.status(200).send(Result.SUCCESS(docs));
    });
};

UserCtrl.getUser = function(req, res) {
    var errors, criteria;
    req.checkParams('id', 'Invalid id').notEmpty();
    errors = req.validationErrors();
    if (errors) return res.status(400).send(Result.ERROR(errors));
    criteria = { _id: req.params.id };
    User.getUser(criteria, function(err, doc) {
        if (err) return res.status(400).send(Result.ERROR(err));
        if (!doc) return res.status(400).send(Result.ERROR('not exist user'));
        res.status(200).send(Result.SUCCESS(doc));
    });
};

UserCtrl.saveUser = function(req, res) {
    var errors, userData;
    req.checkBody('authType', 'Invalid authType').notEmpty();
    req.checkBody('authKey', 'Invalid authKey').notEmpty();
    req.checkBody('name', 'Invalid name').notEmpty();
    errors = req.validationErrors();
    if (errors) return res.status(400).send(Result.ERROR(errors));
    userData = {
        authType: req.body.authType,
        authKey: req.body.authKey,
        name: req.body.name
    };
    User.saveUser(userData, function(err, doc) {
        if (err) return res.status(400).send(Result.ERROR(err));
        res.status(200).send(Result.SUCCESS(doc));
    });
};

UserCtrl.loginUser = function(req, res) {
    var errors, criteria;
    req.checkBody('authType', 'Invalid authType').notEmpty();
    req.checkBody('authKey', 'Invalid authKey').notEmpty();
    errors = req.validationErrors();
    if (errors) return res.status(400).send(Result.ERROR(errors));
    criteria = {
        authType: req.body.authType,
        authKey: req.body.authKey
    };
    User.getUser(criteria, function(err, doc) {
        if (err) return res.status(400).send(Result.ERROR(err));
        if (!doc) return res.status(400).send(Result.ERROR('fail'));
        res.status(200).send(Result.SUCCESS(doc));
    });
};

module.exports = UserCtrl;
