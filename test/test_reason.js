var assert = require('assert');
var kangaBase = '../';
var Reason = require(kangaBase + 'nodes/reasoner/reasoning-node.js');
var kangaLogger = require(kangaBase + 'utils/kanga-logger');
var klogger = new kangaLogger('KangaTopology1', 'error');

// Construct test object
var obj = {};
obj.input_field_name = 'condition';
obj.value = 'station';
obj.klogger = klogger;

obj.event = {"root":{"_header_":{"log":"","type":0,"timestamp":1474946193506,"name":"nools"},"nools":'{"category":"fact","content":{"Persons":["true","true","true"],"Time":"Day","Weather":"Sunny","Temperature":35}}'}};
var reasonObj = new Reason(obj);


var output_data = reasonObj.execute(obj.event);
var expect_data = 'async';

// Execute the test case

describe("reason", function() {
	
    it("data: reason passed", function(done) {
    	
        assert.equal(output_data, expect_data);
        done();
    });
    
    it('time-tick:reason passed', function(done) {
    	obj.event = {"root":{"_header_":{"log":"","type":2,"timestamp":1474946193506,"name":"nools"},"nools":'test'}};
		var x = true;
		var f = function() {
		    x = false;
		    var output_tick = reasonObj.execute(obj.event);
		   
		    assert.equal(output_tick.root.nools.result.Light.power,'off');
		    assert.equal(output_tick.root.nools.result.AirConditioner.power,'on');
		    assert.equal(output_tick.root.nools.result.AirConditioner.temperature,'30');
		    assert.equal(output_tick.root.nools.result.TV.power,'on');
		    assert.equal(output_tick.root.nools.result.TV.volume,'high');
		    assert.equal(output_tick.root.nools.result.MusicPlayer.power,'on');
		    assert.equal(output_tick.root.nools.result.MusicPlayer.earphone,true);
		    done(); 
	  };
	  setTimeout(f, 1000);
	});

   it("collection: reason passed", function(done) {
   		obj.event = {"root":{"_header_":{"log":"","type":1,"timestamp":1474946193506,"name":"nools"},"nools":'{"category":"fact","content":{"Persons":["true","true","true"],"Time":"Day","Weather":"Sunny","Temperature":35}}'}};
		var reasonObj3 = new Reason(obj);
		var output_collection = reasonObj3.execute(obj.event);
		
        assert.equal(output_collection, null);
        done();
    });

    

    it("eof: reason passed", function(done) {
    	obj.event = {"root":{"_header_":{"log":"","type":3,"timestamp":1474946193506,"name":"nools"},"nools":'{"category":"fact","content":{"Persons":["true","true","true"],"Time":"Day","Weather":"Sunny","Temperature":35}}'}};
		var output = reasonObj.execute(obj.event);
		
		var expected =JSON.stringify(obj.event);
        assert.equal(JSON.stringify(output), expected);
        done();
    });

    it("system log: reason passed", function(done) {
    	obj.event = {"root":{"_header_":{"log":"","type":4,"timestamp":1474946193506,"name":"nools"},"nools":'{"category":"fact","content":{"Persons":["true","true","true"],"Time":"Day","Weather":"Sunny","Temperature":35}}'}};
		var output = reasonObj.execute(obj.event);
		
		var expected =JSON.stringify(obj.event);
        assert.equal(JSON.stringify(output), expected);
        done();
    });

    it("other: reason passed", function(done) {
    	obj.event = {"root":{"_header_":{"log":"","type":5,"timestamp":1474946193506,"name":"nools"},"nools":'{"category":"fact","content":{"Persons":["true","true","true"],"Time":"Day","Weather":"Sunny","Temperature":35}}'}};
		var output = reasonObj.execute(obj.event);
        assert.equal(output, null);
        done();
    });
});
