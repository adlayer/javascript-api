/**
* @module api
* @require events, core, request, spaces
*/
(function(){
	var EventEmitter = require('../lib/src//node_modules/events').events.EventEmitter;
	var Space = require('../lib/src/domain/page').Space;
	var request = require('../lib/src/request/request').request;
	var spaces = require('../lib/src/spaces/spaces').spaces;
	
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
	* @param {Object} data Data of current view to track events
	* @public
	* @return this
	*/
	SpaceApi.prototype.renderSpace = function (data, context){
		data.document = this.document;
		var space = spaces.create(data);

		context =  context || {};
		
		var result = space.init(this.tracker, context);
		this.element = result.element;
		
		if(result.ad){
			this.ad = result.ad;
			this.ads = result.ads;
		}
		
		this.width = data.width
		this.height = data.height;
		this.type = data.type;
		this.id = data.id;
		
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
				var space = self.renderSpace(data);
				if(callback){
					callback.call(space);
				}
			}
		});
		return this;	
	};
	
	exports.SpaceApi = SpaceApi;
})();