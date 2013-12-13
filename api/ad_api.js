/**
* @module api
* @requires Events, dom, ads, request, spaces
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
	* @extends AdDom
	* @uses EventEmitter
	*/
	var AdApi = function(){
		AdDom.apply(this, arguments);
		
		/**
		* Reference to document object model root
		*
		* @property document
		* type Object
		*/
		this.document;
		/**
		* Instance os Tracker
		*
		* @property tracker
		* type Object
		*/
		this.tracker;
		/**
		* Instance os Adserver
		*
		* @property tracker
		* type Object
		*/
		this.adserver;
	};
	
	/**
	* @method getData
	* @param {Function} callback
	* @public
	*/
	AdApi.prototype.getData = function(callback){
		this.adserver.ads(this.id, null, callback);
	};
	
	
	/**
	* @method init
	* @param {Object} tracker The instance of tracker to be stored in this.tracker
	* @param {Function} callback
	* @async
	* @public 
	*/
	AdApi.prototype.init = function(tracker, callback){
		var self = this;
		// Get all page data
		this.getData(function(err, data){
			if(!err && data){
				var ad = ads.create(data);
				ad.trackerUrl = tracker.connection.getUrl();
				
				delete data.src;
				delete data.height;
				delete data.status;
				delete data.width;
				delete data.link;
				delete data.type;
				
				ad.setImpression(null, data);
				
				// Listener for 'LOAD' event
				ad.on('load', function(){
					tracker.track(ad.impression);
				});
				
				ad.emit('placement');
				self.element = ad.element;
				callback.call(ad);
			}
		});
		return this;	
	};
	
	exports.AdApi = AdApi;
})();