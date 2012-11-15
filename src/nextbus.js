var Q = require('q'),
	API = require('./api').API;

var NextBus = function(agency) {
	this.agency = agency;
};

NextBus.prototype = new API({
	hostname: 'webservices.nextbus.com',
	format:   API.FORMAT.XML,
	base:     '/service/publicXMLFeed'
});

NextBus.prototype.command = function(command, params) {
	params = params || {};
	params.a = this.agency;
	params.command = command;
	return this.call(params);
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

exports.NextBus = NextBus;
