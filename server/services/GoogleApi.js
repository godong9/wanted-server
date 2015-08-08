var request = require('request');
var _ = require('underscore');
var log4js = require('log4js');
var logger = log4js.getLogger("GoogleApiService");

function GoogleApiService() {

}

var API_KEY = "AIzaSyAW8KhXyKmcq59bwPc5hIYCtlTfuZUTcfU";
var DEFAULT_LANGUAGE = "ko-KR";
GoogleApiService.AUTOCOMPLETE = "autocomplete";
GoogleApiService.TEXTSEARCH = "textsearch";

GoogleApiService.getGeocode = function(address, callback) {
    if (!address) return callback('invalid parameter: address');
    var requestURI;
    if (_.isObject(address)) {
        requestURI = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+address.lat+","+address.lng+"&sensor=false&language="+DEFAULT_LANGUAGE;
    } else {
        requestURI = "https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&sensor=false&language="+DEFAULT_LANGUAGE;
    }

    request.get(requestURI, function(err, resp, body){
        var data;
        if (err) return callback(err);
        try {
            data = JSON.parse(body);
        } catch(e) {
            return callback(null, callback("no result", {}));
        }
        logger.debug('geocode data: ', data);
        if (!data || data.status !== "OK" || !data.results) {
            if (data.status !== "OK") {
                callback(null, data);
            } else {
                callback("no result", {});
            }
        } else {
            callback(null, data.results[0]);
        }
    });
};


module.exports = GoogleApiService;