/**
* @module api
* @require events, core, request, spaces
*/
(function(){
	var EventEmitter = require('../node_modules/events').events.EventEmitter;
	var Space = require('../domain/page').Space;
	var request = require('../request/request').request;
	var spaces = require('../spaces/spaces').spaces;
	
	/**
	* @class SpaceApi
	* @constructor
	* @extends Space
	* @uses EventEmitter
	*/			
	var SpaceApi = function(){
		Space.apply(this, arguments);
		EventEmitter.apply(this, arguments);
		
		this.document;
		this.tracker;
		this.adserver;
		this.ad = {};
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
	* @return this
	*/
	SpaceApi.prototype.renderSpace = function (space, data){
		var result = space.init(this.tracker, data);
		this.element = result.element;
		
		if(result.ad){
			this.ad = result.ad;
			this.ads = result.ads;
		}
		return this;
	};

	/**
	* @method init
	* @param {Function} callback Function to be called ofter space rendering process
	* @async
	* @public
	*/
	SpaceApi.prototype.init = function(callback){
		var self = this;
		// Get all page data
		this.getData(function(err, data){
			if(!err && data){
				data.document = self.document;
				var space = spaces.create(data);
				space = self.renderSpace(space, {space_id: data.id});
				if(callback){
					callback.call(space);
				}
			}
		});
		return this;	
	};
	
	exports.SpaceApi = SpaceApi;
})();