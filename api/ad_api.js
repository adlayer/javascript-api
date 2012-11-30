/**
* @module PageApi
*/
(function(){
	var EventEmitter = require('../node_modules/events').events.EventEmitter;
	var AdDom = require('../lib/dom/ad_dom').AdDom;
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
		AdDom.apply(this, arguments);
		
		this.document;
		this.tracker;
		this.adserver;
	};
	
	/**
	* @method getData
	* @param {Function} callback
	*/
	AdApi.prototype.getData = function(callback){
		this.adserver.ads(this.id, null, callback);
	};
	
	
	/**
	* @method init
	* @public 
	*/
	AdApi.prototype.init = function(tracker, callback){
		var self = this;
		// Get all page data
		this.getData(function(err, data){
			if(!err && data){

				var ad = ads.create(data);
				ad.tracker = tracker;
				ad.init({id: undefined}, {});
				ad.emit('placement');
				self.element = ad.element;
				callback.call(ad);
			}
		});
		return this;
		
	};
	
	exports.AdApi = AdApi;
})();