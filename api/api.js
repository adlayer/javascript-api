(function(window){

	var Adlayer = require('./adlayer').Adlayer;
	var defaultConfig = require('../config/config').config;

	// Defining API
	var global = global || window;
	
	var api = global.adlayer || {};

	// Define config
	var config = api.config || {};

	/**
	* A reference for the current rendered page
	* Also stores references for spaces and ads rendered on the page
	*
	* @submodule page
	*/
	api.page = api.page || null;

	/**
	* @submodule config
	*/
	api.config = config;
	
	/**
	* Stores user profile
	*
	* @submodule targeting
	*/
	api.targeting = api.targeting;

	/**
	* Stores all connections
	*
	* @submodule connections
	*/
	api.connections = api.connections;
	
	/**
	* Handle adserver connections
	*
	* @submodule adserver
	*/
	api.adserver = api.adserver || null;
	
	/**
	* Handle tracker operations
	*
	* @submodule tracker
	*/
	api.tracker = api.tracker || null;
	
	
	/**
	* Stores in a hash all spaces rendered on this page 
	*
	* @submodule spaces
	* @example
		console.log(window.adlayer.spaces);
	*/
	api.spaces = api.spaces || null;

	/**
	* Stores all placed and rendered ads on this page
	*
	* @submodule ads
	*/
	api.ads = api.ads || null;


	
	// api as an instance of Adlayer
	var instance = new Adlayer(api);
	
	/**
	* Shortcut for all internal classes
	*
	* @submodule lib
	*/
	instance.lib = require('*');
	global.adlayer = instance;
	
})(this);