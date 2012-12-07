(function(window){
	
	/**
	* Adlayer API
	* @module api
	* @main api
	*/
	var Connection = require('../connection/connection').Connection;
	var Tracker = require('../tracker/tracker').Tracker;
	var Adserver = require('./adserver').Adserver;
	var defaultConfig = require('../config/config').config;

	
	/**
	* @class Api
	*/
	var global = global || window;
	var api = global.adlayer || {};

	// Defining configs
	var config = api.config || {};

	// Merging config options
	config.url = config.url || defaultConfig.url;
	config.adsPerSpace = config.adsPerSpace || defaultConfig.adsPerSpace;
	config.page = config.page || defaultConfig.page;

	/**
	* Exports config
	*
	* @property config
	* @type object
	*/
	api.config = config;

	// Defining connections
	var connections = {};
	connections.adserver = new Connection(config.url.adserver);
	connections.adserver.name = 'adserver';

	connections.tracker = new Connection(config.url.tracker);
	connections.tracker.name = 'tracker';

	// Defining adserver
	var adserver = new Adserver();
	adserver.connection = connections.adserver;

	// Defining tracker	
	var tracker = new Tracker();
	tracker.connection = connections.tracker;



	/**
	* Exports adserver
	*
	* @property adserver
	* @type object
	*/
	api.adserver = api.adserver || adserver;

	/**
	* Exports tracker
	*
	* @property tracker
	* @type object
	*/
	api.tracker = api.tracker || tracker;

	/**
	* Exports page api
	*
	* @property page
	* @type object
	*/
	api.page = api.page || {};

	/**
	* Exports configuration
	*
	* @property config
	* @type object
	*/
	api.config = config;

	/**
	* Exports connections
	*
	* @property connections
	* @type object
	*/
	api.connections = api.connections || connections;

	/**
	* Exports spaces
	*
	* @property spaces
	* @type object
	* @example 
		var space = adlayer.spaces['0202kjj44949999992j8'];
		space.close();
	*/
	api.spaces = api.spaces || {};

	/**
	* Exports ads
	*
	* @property ads
	* @type object
	* @example 
		var ad = adlayer.ads['mfkvfmvkdfvdf84848484'];
		ad.emit('load');
	*/
	api.ads = api.ads || {};

	/**
	* Shortcut for adlayer.ads[id].emit, used by flash preloaders
	*
	* @method markAdAsLoaded
	* @param {String} id
	* @public
	*/
	api.markAdAsLoaded = function(id){
		api.ads[id].emit('load');
	};

	/**
	* A list of all adlayer modules
	*
	* @property lib
	* @type object
	*/
	api.lib = require('*');

	/**
	* Exports Adlayer namespace
	*
	* @property adlayer
	* @type object
	*/
	global.adlayer = api;
})(this);