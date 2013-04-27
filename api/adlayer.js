var config = require('./config').config;
var Connection = require('../lib/connection/connection').Connection;
var EventEmitter = require('../lib/node_modules/events').events.EventEmitter;
var Tracker = require('../tracker/tracker').Tracker;
var Adserver = require('./adserver').Adserver;

/**
* @module api
*/

/**
* Abstraction of Adlayer Api
*
* @class Adlayer
* @constructor
* @extensionfor api
*/
var Adlayer = function(api){
	/**
	* A shortcut for Adlayer library
	*
	* @property lib
	* @type object
	*/
	this.lib = {}
	
	
	/**
	* Define or extends configuration for API
	* You can use this for customize default attributes
	*
	* @property config
	* @default object
	* @type object
	*/
	this.config = config;
	
	
	/**
	* A collection of all connections (open and closed ones)
	* Provide total control over adserver and tracker connection and respective request
	*
	*
	* @property connections
	* @default object
	* @type object
	*/
	this.connections = api.connections || {};
	
	/**
	* Exports adserver
	*
	* @property adserver
	* @type object
	*/
	this.adserver = api.adserver || {};
	
	/**
	* Exports tracker
	*
	* @property tracker
	* @type object
	* @example
		var adlayer = new Adlayer();
		var tracker = adlayer.tracker;
		tracker.track({type:'impressions', campaign_id: 'jdskdkskdsds', 'ad_id': 'kfvodfvfdvdi'});
	*/
	this.tracker = api.tracker || {};
	
	/**
	* Collection of all rendered spaces on the page
	*
	*
	* @property spaces
	* @default object
	* @type object
	* @example
		var adlayer = new Adlayer();
		var space = adlayer.spaces['kdkfsfd0fsf000'];
		space.close();
	*/
	this.spaces = api.spaces || {};
	
	
	/**
	* A shortcut for a collection of all ads rendered on the respective spaces
	*
	*
	* @property ads
	* @default object
	* @type object
	* @example
		var adlayer = new Adlayer();
		var ad = adlayer.ads['mfkvfmvkdfvdf84848484'];
		ad.emit('load');
	*/
	this.ads = api.ads || {};
	
	/**
	* A shortcut for the rendered page
	* Will always be a instace of class Page
	*
	*
	* @property page
	* @default object
	* @type object
	*/
	this.page = api.page || {};
	
	var __construct = (function(self){
		if( api.config ){
			self.config.url = api.config.url || self.config.url;
			self.config.adsPerSpace = api.adsPerSpace || self.config.adsPerSpace;
			self.config.page = api.config.page || self.config.page;
		};
		self.connect();
	})(this);
};

Adlayer.prototype = new EventEmitter();
/**
* Shortcut for adlayer.ads[id].emit, used by flash preloaders
*
* @method markAdAsLoaded
* @param {String} id
* @public
*/
Adlayer.prototype.markAdAsLoaded = function(id){
	var ad = this.ads[id];
	ad.emit('load');
};

/**
* Start or restart all connections based on config.urls
*
* @method connect
* @param {String} id
* @public
*/
Adlayer.prototype.connect = function(){
	var config = this.config;
	this.connections.adserver = new Connection(config.url.adserver);
	this.connections.adserver.name = 'adserver';
	
	this.connections.tracker = new Connection(config.url.tracker);
	this.connections.tracker.name = 'tracker';
	
	// Set adserver
	this.adserver = new Adserver();
	this.adserver.connection = this.connections.adserver;

	// Set tracker	
	this.tracker = new Tracker();
	this.tracker.connection = this.connections.tracker;
};

exports.Adlayer = Adlayer;