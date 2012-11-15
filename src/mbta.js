var	Q = require('q'),
	API = require('./api').API;

var MBTA = function() {};

MBTA.REDLINE = "Red";
MBTA.ORANGELINE = "Orange";
MBTA.BLUELINE = "Blue";

MBTA.prototype = new API({
	hostname: 'developer.mbta.com',
	format:   API.FORMAT.JSON
});

MBTA.prototype.predictions = function() {
	return this.call('RT_Archive/RealTimeHeavyRailKeys.csv', API.FORMAT.CSV_HEADER);
};

MBTA.prototype.subways = function() {
	var deferred = Q.defer();
	deferred.resolve([MBTA.REDLINE, MBTA.ORANGELINE, MBTA.BLUELINE])
	return deferred.promise;
}

MBTA.prototype.subway = function(line) {
	return this.call('Data/'+line+'.json');
};

exports.MBTA = MBTA;
