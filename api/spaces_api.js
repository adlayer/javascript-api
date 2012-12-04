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
			domain: this.domain,
			site_id: this.site_id,
			ads_per_space: this.adsPerSpace
		};
		this.adserver.pages(this.id, qs, callback);
	};
	
	/**
	* @method scanSpaces
	* @param {Function} collection
	* @param {Function} callback
	*/
	SpaceApi.prototype.scanSpaces = function(collection, callback){

		for( var i = 0; i < collection.length; i++ ){
			var space = collection[i];
			space.document = this.document;
			space = spaces.create(space);
			space.element = space.getElement();
			
			if ( space.element ){
				callback(null, space);
			} else {
				var error = {
					error: 'not found',
					id: space._id
				};
				callback(error, null);
			}
		}
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
	SpaceApi.prototype.init = function(){
		
		var page = this;

		// Get all page data
		this.getData(function(err, data){
			// When we get spaces in this page
			if(data && data.spaces){
				// For each space found in document
				page.scanSpaces(data.spaces, function(err, space){
					// When find spaces
					if(!err){

						var config = {
							domain: page.domain,
							page_url: page.url,
							page_id: page.id,
							site_id: page.site_id
						};
						page.renderSpace(space, config);
						// exporting space to api
						page.spacesCollection[space.id] = space;
					}
				});
			}
		});
		return page;
	};
	
	exports.PageApi = PageApi;
})();