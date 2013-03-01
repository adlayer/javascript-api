(function(window){

	var Adlayer = require('./adlayer').Adlayer;
	var defaultConfig = require('../config/config').config;

	// Defining API
	var global = global || window;
	var api = global.adlayer || {};

	// Defining configs
	var config = api.config || {};

	// Set Page
	api.page = api.page || {};

	// Set Config
	api.config = config;

	// Set Connections
	api.connections = api.connections || {};

	// Set Spaces
	api.spaces = api.spaces || {};

	// Set Ads
	api.ads = api.ads || {};


	// api as an instance of Adlayer
	api = new Adlayer(api);
	global.adlayer = api;
	
})(this);