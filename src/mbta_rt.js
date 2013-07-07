var API = require('common-api').API;

var MBTA_RT = function(api_key) {
    this.api_key = api_key;
};

MBTA_RT.prototype = new API({
	hostname: 'realtime.mbta.com',
	format:   API.FORMAT.JSON,
    base:     '/developer/api/v1/',
    
    urlTransform: function(url) {
        url += url.indexOf('?')>=0?'&':'?';
        url += 'api_key=' + this.api_key;

        return url;
    }
});

MBTA_RT.prototype.serverTime = function() {
    return this.call('servertime');
};

MBTA_RT.prototype.routes = function() {
    return this.call('routes');
};

MBTA_RT.prototype.routesByStop = function(stop) {
    return this.call('routesbystop', {
        stop: stop
    });
};

MBTA_RT.prototype.stopsByRoute = function(route) {
    return this.call('stopsbyroute', {
        route: route
    });
};

MBTA_RT.prototype.stopsByLocation = function(lat, lon) {
    return this.call('stopsbylocation', {
        lat: lat,
        lon: lon
    });
};

MBTA_RT.prototype.scheduleByStop = function(stop, route, direction, datetime) {
    var data = {
        stop: stop
    };
    
    if (route) data.route = route;
    if (direction) data.direction = direction;
    if (datetime) data.datetime = datetime;
    
    return this.call('schedulebystop', data);
};

MBTA_RT.prototype.scheduleByRoute = function(route, direction, datetime) {
    var data = {
        route: route
    };
    
    if (direction) data.direction = direction;
    if (datetime) data.datetime = datetime;
    
    return this.call('schedulebyroute', data);
};

MBTA_RT.prototype.scheduleByTrip = function(trip, datetime) {
    var data = {
        trip: trip
    };
    
    if (datetime) data.datetime = datetime;
    
    return this.call('schedulebytrip', data);
};

MBTA_RT.prototype.alerts = function() {
    return this.call('alerts');
};

MBTA_RT.prototype.alertHeaders = function() {
    return this.call('alertheaders');
};

MBTA_RT.prototype.alertsByRoute = function(route) {
    return this.call('alertsbyroute', {
        route: route
    });
};

MBTA_RT.prototype.alertHeadersByRoute = function(route) {
    return this.call('alertheadersbyroute', {
        route: route
    });
};

MBTA_RT.prototype.alertsByStop = function(stop) {
    return this.call('alertsbystop', {
        stop: stop
    });
};

MBTA_RT.prototype.alertHeadersByStop = function(stop) {
    return this.call('alertheadersbystop', {
        stop: stop
    });
};

MBTA_RT.prototype.alertsByID = function(id) {
    return this.call('alertbyid', {
        id: id
    });
};

exports.MBTA_RT = MBTA_RT;

