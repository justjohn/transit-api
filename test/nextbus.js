var chai = require('chai'),
  expect = chai.expect,
  should = chai.should(),
  nextbus = require('../transit').NextBus,
  api = new nextbus('portland-sc');

describe('nextbus api calls', function() {

  this.timeout(10000);

  it('agencyList', function() {
    return api.agencyList().then(function(data) {
      //console.log(data);
      should.exist(data);
      expect(data.length).to.be.above(0);
    });
  });

  it('routeList', function() {
    return api.routeList().then(function(data) {
      //console.log(data);
      should.exist(data);
      expect(data.length).to.be.above(0);
    });
  });

  it('routeConfig', function() {
    //this.timeout(10000);
    return api.routeConfig('193').then(function(data) {
      should.exist(data);
      expect(data.stop.length).to.be.above(0);
    });
  });

  it('predictions', function() {
    return api.predictions('193', '10767').then(function(data) {
      //console.log(data);
      should.exist(data);
      data.should.have.property('agencyTitle');
      if(!data.dirTitleBecauseNoPredictions) {
        expect(data.direction.prediction.length).to.be.above(0);
      } else {
        console.warn('No predictions found.  Are you testing outside of regular service?');
      }
    });
  });

  it('predictionsForMultiStops', function() {
    return api.predictionsForMultiStops({"193":['10767']}).then(function(data) {
      //console.log(data);
      should.exist(data);
      data.should.have.property('agencyTitle');
      if(!data.dirTitleBecauseNoPredictions) {
        expect(data.direction.prediction.length).to.be.above(0);
      } else {
        console.warn('No predictions found.  Are you testing outside of regular service?');
      }
    });
  });

  it('schedule', function() {
    return api.schedule('193').then(function(data) {
      //console.log(data);
      should.exist(data);
      expect(data.route.length).to.be.above(0);
    });
  });

  it('messages', function() {
    return api.messages().then(function(data) {
      //console.log(data);
      should.exist(data);
      if(data.route && data.route.length > 1) {
        expect(data.route.length).to.be.above(1);
      } else {
        console.warn('No messages found, does this agency use NextBus for publishing messages?');
      }
    });
  });

  it('vehicleLocations', function() {
    return api.vehicleLocations('193').then(function(data) {
      //console.log(data);
      should.exist(data);
      data.should.have.property('lastTime');
      if(data.vehicle) {
        expect(data.vehicle.length).to.be.above(0);
      } else {
        console.warn('No vehicles found.  Are you testing outside of regular service?');
      }
    });
  });

});