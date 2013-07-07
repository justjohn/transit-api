var Q = require('q'),
    fs = require('fs'),
    MBTA_RT = require('../transit').MBTA_RT,
    api = new MBTA_RT('wX9NwuHnZU2ToO7GmGR9uw');
    
var delayFn = function(fn, delay) {
        return function() {
            var that = this,
                args = Array.prototype.slice.apply(arguments);
            setTimeout(function(){fn.apply(that, args);}, delay);
        };
    },
    jsonFn = function(data) {
        console.log(JSON.stringify(data, null, 3));
    },
    logFn = function(data) {
        console.log(data);
    },
    fileFn = function(filename) {
        return function(data) {
            fs.writeFileSync(filename, JSON.stringify(data, null, 3));
        };
    };

var calls = [
    ['serverTime'],
    ['routes'], 
    ['stopsByRoute', '931_'],
    ['stopsByLocation', '42.373616', '-71.109732'],
    ['scheduleByStop', '70065'],
    ['routesByStop', '70065']
];

var i = 0;

calls.forEach(function(args) {
    var fn = args.shift();
    
    delayFn(function() {
        api[fn].apply(api, args).then(fileFn(__dirname + "/output/" + fn + ".json"), logFn);
    }, ++i*1000)();
});


