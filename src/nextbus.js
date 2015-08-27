var Q = require('q'),
	API = require('common-api').API;

var NextBus = function(agency) {
	this.agency = agency;
};

NextBus.prototype = new API({
	hostname: 'webservices.nextbus.com',
	format:   API.FORMAT.XML,
	base:     '/service/publicXMLFeed'
});

NextBus.prototype.setAgency = function(agency) {
	this.agency = agency;
}

NextBus.prototype.command = function(command, params) {
	params = params || {};
	params.a = this.agency;
	params.command = command;
	return this.call(params);
};

NextBus.prototype.agencyList = function() {
	return this.call({command: "agencyList"}).then(function(obj) {
		return obj.body.agency;
	});
};

NextBus.prototype.routeList = function() {
	return this.command("routeList").then(function(obj) {
		return obj.body.route;
	});
};

NextBus.prototype.routeConfig = function(routeTag) {
	return this.command("routeConfig", {r: routeTag}).then(function(obj) {
		return obj.body.route;
	});
};

NextBus.prototype.predictions = function(routeTag, stopTag) {
	// if only one argument is specified, assume it's a stopId
	var params;
	if (stopTag === undefined)
		params = {stopId: routeTag};
	else
		params = {r: routeTag, s: stopTag};

	return this.command("predictions", params).then(function(obj) {
		return obj.body.predictions;
	});
};


// Format of stop pairs:
// {routeTag: [StopTag, StopTag, ...], routeTag: [...], ...}
//
NextBus.prototype.predictionsForMultiStops = function(stopPairs) {
	var route, stops, stop, i,
		params = {
			stops: []
		};

	for (route in stopPairs) if (stopPairs.hasOwnProperty(route)) {
		stops = stopPairs[route];
		for (i=0;i<stops.length;i++) {
			params.stops.push(route+"|"+stops[i]);
		}
	}

	//console.log(params);


	return this.command("predictionsForMultiStops", params).then(function(obj) {
		return obj.body.predictions;
	});
};

NextBus.prototype.schedule = function(routeTag) {
	var params = {
		r: routeTag ? routeTag : '',
		t: 0
	}

	return this.command("schedule", params).then(function(obj) {
		return obj.body;
	});
}

NextBus.prototype.messages = function(routeTags) {
	var params = {
		t: 0
	}

	if(routeTags) {
		params.r = routeTags;
	}

	return this.command("messages", params).then(function(obj) {
		return obj.body;
	});
}

NextBus.prototype.vehicleLocations = function(routeTag) {
	var params = {
		r: routeTag ? routeTag : '',
		t: 0
	}

	return this.command("vehicleLocations", params).then(function(obj) {
		return obj.body;
	});
}

exports.NextBus = NextBus;
