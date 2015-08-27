var chai = require('chai'),
  expect = chai.expect,
  nextbus = require('../transit').NextBus,
  api = new nextbus('portland-sc');

chai.should();

describe('nextbus api calls', function() {

  it('agencyList', function(done) {
    this.timeout(10000);
    api.agencyList().then(function(data) {
      expect(data.length).to.be.above(0);
      done();
    });
  });

  it('routeList', function(done) {
    this.timeout(10000);
    api.routeList().then(function(data) {
      //console.log(data);
      expect(data.length).to.be.above(0);
      done();
    });
  });

  it('routeConfig', function(done) {
    this.timeout(10000);
    api.routeConfig('193').then(function(data) {
      expect(data.stop.length).to.be.above(0);
      done();
    });
  });

  it('predictions', function(done) {
    this.timeout(10000);
    api.predictions('193', '10755').then(function(data) {
      //console.log(data);
      data.should.have.property('agencyTitle');
      if(!data.dirTitleBecauseNoPredictions) {
        expect(data.direction.prediction.length).to.be.above(0);
      } else {
        console.warn('No predictions found.  Are you testing outside of regular service?');
      }
      done();
    });
  });

  it('predictionsForMultiStops', function(done) {
    this.timeout(10000);
    api.predictionsForMultiStops({"193":['10755']}).then(function(data) {
      //console.log(data);
      data.should.have.property('agencyTitle');
      if(!data.dirTitleBecauseNoPredictions) {
        expect(data.direction.prediction.length).to.be.above(0);
      } else {
        console.warn('No predictions found.  Are you testing outside of regular service?');
      }
      done();
    });
  });

  it('vehicleLocations', function(done) {
    this.timeout(10000);
    api.vehicleLocations().then(function(data) {
      data.should.have.property('lastTime');
      if(data.vehicle) {
        expect(data.vehicle.length).to.be.above(0);
      } else {
        console.warn('No vehicles found.  Are you testing outside of regular service?');
      }
      done();
    });
  });

});