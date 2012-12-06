/**
* @module PageApi
*/
(function(){
	var EventEmitter = require('../node_modules/events').events.EventEmitter;
	var Space = require('../domain/page').Space;
	var request = require('../request/request').request;
	var spaces = require('../spaces/spaces').spaces;
	
	/**
	* @class PageApi
	* @constructor
	* @extends Page
	* @extends EventEmitter
	*/			
	var SpaceApi = function(){
		Space.apply(this, arguments);
		EventEmitter.apply(this, arguments);
		
		this.document;
		this.tracker;
		this.adserver;
		this.spacesCollection = {};
		this.adsCollection = {};
	};
	
	/**
	* @method getData
	* @param {Function} callback
	*/
	SpaceApi.prototype.getData = function(callback){
		var qs = {
			ads_per_space: this.adsPerSpace
		};
		this.adserver.spaces(this.id, qs, callback);
	};
	
	/**
	* @method renderSpace
	* @param {Object} space Instance of Space Class to find and render in DOM
	* @param {Object} data Data of current view to track events
	* @public
	*/
	SpaceApi.prototype.renderSpace = function (space, data){
		var result = space.init(this.tracker, data);
		if(result.ad){
			this.adsCollection[result.ad.id] = result.ad;
		}
	};

	/**
	* @method init
	* @public 
	*/
	/**
	* @method init
	* @public 
	*/
	SpaceApi.prototype.init = function(callback){
		var self = this;
		// Get all page data
		this.getData(function(err, data){
			if(!err && data){
				data.document = self.document;
				var space = spaces.create(data);
				self.renderSpace(space, {space_id: data._id});
				self.element = space.element;
				callback.call(space);
			}
		});
		return this;	
	};
	
	exports.SpaceApi = SpaceApi;
})();