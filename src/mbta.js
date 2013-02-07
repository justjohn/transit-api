var	Q = require('q'),
	API = require('common-api').API;

var MBTA = function() {};

MBTA.REDLINE = "Red";
MBTA.ORANGELINE = "Orange";
MBTA.BLUELINE = "Blue";

MBTA.prototype = new API({
	hostname: 'developer.mbta.com',
	format:   API.FORMAT.JSON
});

MBTA.prototype.subways = function(forLine) {
	return this.call('RT_Archive/RealTimeHeavyRailKeys.csv', API.FORMAT.CSV_HEADER).then(function(predictions) {
            var prediction, i, line, predictionByLine = {};
            for (i=0;i<predictions.length;i++) {
                prediction = predictions[i];
                line = prediction["Line"];
                if (!predictionByLine[line])
                    predictionByLine[line] = [];
                predictionByLine[line].push(prediction);
            }
            if (forLine === undefined)
                return predictionByLine;
            else
                return predictionByLine[forLine];
        });
};

MBTA.prototype.lines = function() {
	var deferred = Q.defer();
	deferred.resolve([MBTA.REDLINE, MBTA.ORANGELINE, MBTA.BLUELINE])
	return deferred.promise;
}

MBTA.prototype.predictions = function(line) {
	return this.call('Data/'+line+'.json');
};

exports.MBTA = MBTA;
