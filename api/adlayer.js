var config = require('./config').config;
var Connection = require('../lib/connection/connection').Connection;
var EventEmitter = require('../lib/node_modules/events').events.EventEmitter;
var Tracker = require('../tracker/tracker').Tracker;
var Adserver = require('./adserver').Adserver;

/**
* Abstraction of Adlayer Api
*
* @class Adlayer
* @constructor
*/
var Adlayer = function(api){
	/**
	* A shortcut for Adlayer library
	*
	* @property lib
	* @type object
	*/
	this.lib = require('*');
	
	
	/**
	* Api configurations
	*
	* @property config
	* @type object
	*/
	this.config = config;
	
	
	/**
	* Exports connections
	*
	* @property connections
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
	*/
	this.tracker = api.tracker || {};;
	
	/**
	* List of all ads rendered in the page
	*
	* @property ads
	* @type object
	* @example 
		var ad = adlayer.ads['mfkvfmvkdfvdf84848484'];
		ad.emit('load');
	*/
	this.ads = api.ads || {};
	
	/**
	* Exports page api
	*
	* @property page
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
	api.ads[id].emit('load');
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