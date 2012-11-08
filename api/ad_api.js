/**
* @module PageApi
*/
(function(){
	var EventEmitter = require('../node_modules/events').events.EventEmitter;
	var Ad = require('../domain/ad').Ad;
	var ads = require('./lib/src/ads/ads').ads;
	var request = require('../request/request').request;
	var spaces = require('../spaces/spaces').spaces;
	
	/**
	* @class AdApi
	* @constructor
	* @extends Ad
	* @extends EventEmitter
	*/			
	var AdApi = function(){
		Ad.apply(this, arguments);
		EventEmitter.apply(this, arguments);
		
		this.document;
		this.tracker;
		this.connection;
		
		this.spacesCollection = {};
		this.adsCollection = {};
	};
	
	/**
	* @method getData
	* @param {Function} callback
	*/
	AdApi.prototype.getData = function(callback){
		var sign = this.connection.id();
		var opts = copy(this.connection);
		opts.host = opts.host;
		opts.path = '/ads/' + this.id;
		opts.qs = {
			callback: 'adlayer.connections.adserver.requests.' + sign + '.callback'
		};
		var req = request().get(opts, callback);
		this.connection.requests[sign] = req;
		
	};
	
	
	/**
	* @method init
	* @public 
	*/
	AdApi.prototype.init = function(callback){
		var self = this;
		// Get all page data
		this.getData(function(err, data){
			var ad = ads.create(data);
			self.element = ad.element;
			callback.call(self);
		});
		return this;
		
	};
	
	exports.AdApi = AdApi;
})();