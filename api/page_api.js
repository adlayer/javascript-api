/**
* @module api
* @requires events, core, request, spaces
*/
(function(){
	var EventEmitter = require('../lib/src/node_modules/events').events.EventEmitter;
	var Page = require('../lib/src/domain/page').Page;
	var request = require('../lib/src/request/request').request;
	var spaces = require('../lib/src/spaces/spaces').spaces;
	var SpaceApi = require('./spaces_api').SpaceApi;

	/**
	* @class PageApi
	* @constructor
	* @extends Page
	* @uses EventEmitter
	*/			
	var PageApi = function(){
		Page.apply(this, arguments);
		EventEmitter.apply(this, arguments);
		
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
		/**
		* Collection of spaces rendered on this page
		*
		* @property spacesCollection
		* type Object
		*/
		this.spacesCollection = {};
		/**
		* Collection of ads rendered on this page in each respective space
		*
		* @property adsCollection
		* type Object
		*/
		this.adsCollection = {};
	};
	
	/**
	* @method getData
	* @param {Function} callback
	* @async
	*/
	PageApi.prototype.getData = function(callback){
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
	PageApi.prototype.scanSpaces = function(collection, callback){

		for( var i = 0; i < collection.length; i++ ){
			var space = collection[i];
			space.document = this.document;
			space.element = this.document.getElementById(space._id);
			
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
	PageApi.prototype.renderSpace = function (space, data){
		var result = space.init(this.tracker, data);
		if(result.ad){
			this.adsCollection[result.ad.id] = result.ad;
		}
	};

	/**
	* @method init
	* @async
	* @public 
	*/
	PageApi.prototype.init = function(){
		
		var page = this;

		// Get all page data
		this.getData(function(err, data){
			// When we get spaces in this page
			if(data && data.spaces){
				// For each space found in document
				page.scanSpaces(data.spaces, function(err, data){
					// When find spaces
					if(!err){
						var space = new SpaceApi({
							id: data.id,
							adserver: page.adserver,
							tracker: page.tracker,
							document: page.document
						});

						var context = {
							domain: page.domain,
							page_url: page.url,
							page_id: page.id,
							site_id: page.site_id
						};
						var render = space.renderSpace(data, context);
						page.spacesCollection[render.id] = render;
						page.adsCollection[render.ad.id] = render.ad;
					}
				});
			}
		});
		return page;
	};
	
	exports.PageApi = PageApi;
})();