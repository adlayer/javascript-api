/**
* This is the inital point for Adlayer Api
*
* @module api
* @main
* @requires adlayer, config

* @example __Access the configs of API__

	adlayer.config
	
---------------------
	
* @example __Requesting data from adserver__
	
	adlayer.adserver.pages('838jjkamr87d88930048', {}, function(data){
		console.log(data);
	});
	
	adlayer.adserver.spaces('d88930048838jjkamr87', {}, function(data){
		console.log(data);
	});
	
	adlayer.adserver.ads('33030d88930048838jjkamr87', {}, function(data){
		console.log(data);
	});

* see more at {{#crossLink "Adserver"}}{{/crossLink}}

----------------------	

* @example __Tracking Impressions and clicks__

	adlayer.tracker.track('impression', {});

	adlayer.tracker.track('click', {});
	
* see more at {{#crossLink "Tracker"}}{{/crossLink}}

----------------------

* @example __Managing rendered creatives ads__

	var ad = adlayer.ads['kdfsdf0df0sdfsfdsjf'];
	ad.emit('placement');
	
----------------------

* @example __Managing rendered spaces__

	var space = adlayer.spaces['jdfndfdjfdsdf0sd0f'];
	space.close();

----------------------

* @example __Accesing internal classes__

	new adlayer.lib.Adserver();

See more at {{#crossLinkModule "lib"}}{{/crossLinkModule}}	
	
----------------------
* @example __Creating an spaces__

	adlayer.lib.spaces.create({type:'floater'});
	
* See more at {{#crossLinkModule "spaces"}}{{/crossLinkModule}}
	
----------------------

* @example __Creating an ad__
	
	adlayer.lib.ads.create({type:'flash'});

See more at {{#crossLinkModule "ads"}}{{/crossLinkModule}}

----------------------

* @example __Overide default options__

	var adlayer = adlayer || {};
	adlayer.config = adlayer.config || {};
	adlayer.config.adsPerSpace = 10;
	
----------------------
*/

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
	* Stores all connections
	*
	* @submodule connections
	*/
	api.connections = api.connections || null;
	
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
	api = new Adlayer(api);
	
	/**
	* Shortcut for all internal classes
	*
	* @submodule lib
	*/
	api.lib = require('*');
	global.adlayer = api;
	
})(this);