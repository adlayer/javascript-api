/**
* This is the inital point for Adlayer Api
*
* @module api
* @main
* @requires adlayer, config
* @example

# Adlayer Javascript Api
The Adlayer Javascript API provides a library to create customizable integrations with our adserving.

----------------------

## Installation

Add the following tag inside the tag ```head``` of your html document:
```<script src="http://api.adlayerjavascriptsdk.com/api.min.js" type="text/javascript"></script>```

To get the uncompressed and commented file use ``` http://api.adlayerjavascriptsdk.com/api.js ```

----------------------

## Configuration
You can check and change configuration of the library execution code.

* @example __Access the configs of API__

	adlayer.config;

* @example __Overring default configuration__

Can be useful for create plugins or change options before "api.js" have beeing loaded

	var adlayer = adlayer || {};
	adlayer.config = adlayer.config || {};
	adlayer.config.adsPerSpace = 10;
	
---------------------

## Adserving

In order to comunicate with Adlayer Ad server API, you can use the methods of ```adlayer.adserver``` namespace

* @example __Requesting page data from adserver__
	
	adlayer.adserver.pages('838jjkamr87d88930048', {}, function(data){
		console.log(data);
	});
	
* @example __Requesting spaces data directally from adserver__

	adlayer.adserver.spaces('d88930048838jjkamr87', {}, function(data){
		console.log(data);
	});
	
* @example __Request ads data using the api__

	adlayer.adserver.ads('33030d88930048838jjkamr87', {}, function(data){
		console.log(data);
	});

* see more at {{#crossLink "Adserver"}}{{/crossLink}}

----------------------	

## Tracking


* @example __Tracking Impressions mannually__

	adlayer.tracker.track('impression', {});

* @example __Tracking clicls__

	adlayer.tracker.track('click', {});
	
* see more at {{#crossLink "Tracker"}}{{/crossLink}}

----------------------

## Managing Rendered ads
After the rendering process all placed ads can be accessed and managed.

To access the rendered ads you shuold use ```adlayer.ads```, this namespace is a collection of all displayed ads that can be handle by the UUID.

* @example __Emiting an ad placement__

	var ad = adlayer.ads['kdfsdf0df0sdfsfdsjf'];
	ad.emit('placement');

* Ads are by default an EventEmitter and every time an and are inserted into a space it will be called "placement", 
so when a placement occours the placament event should dispatched.
	
* @example __Emiting the ad onload event__

	var ad = adlayer.ads['kdfsdf0df0sdfsfdsjf'];
	ad.emit('load');
	
* Adlayer consider as an impressions just when the ad file is completelly loaded, and our library are programed to comunicate with our servers
and register a new impressions when the event ```load``` is triggered.

* To view all Ads methods and events checkout Ads library API

----------------------

## Manipulating rendered DOM Spaces
So as in ads all spaces present in the DOM and already rendered by our library (not necessarily with an ad placement) can be accessed by UUID.

* @example __Closing spaces__

	var space = adlayer.spaces['jdfndfdjfdsdf0sd0f'];
	space.close();

* To view all Spaces methods and events checkout Spaces library API

----------------------

## Adlayer API internal Library
Adlayer Javascript API is bult based on Adlayer Javascript Library, 
this library is embbed in every release of our API or widgets and completally accessible via ```adlayer.lib```.

* @example __Creating a instance of a Adserver internal Adserver class__

	new adlayer.lib.Adserver();

See more at {{#crossLinkModule "lib"}}{{/crossLinkModule}}	
	
----------------------

* @example __Creating an spaces__

	adlayer.lib.spaces.create({type:'floater'});
	
* See more at {{#crossLinkModule "spaces"}}{{/crossLinkModule}}
	
----------------------

* @example __Creating ads__
	
	adlayer.lib.ads.create({type:'flash'});

See more at {{#crossLinkModule "ads"}}{{/crossLinkModule}}
	
----------------------
*/

var config = require('./config').config;
var Connection = require('../lib/connection/connection').Connection;
var EventEmitter = require('../lib/node_modules/events').events.EventEmitter;
var Tracker = require('../tracker/tracker').Tracker;
var Adserver = require('./adserver').Adserver;

/**
* Abstraction of Adlayer Api
*
* @class Adlayer
* @uses config, connection, eventemitter, tracker, adserver
* @constructor
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
	* A collection of all user profile data
	* Allows directed messages ads
	*
	*
	* @property targeting
	* @default object
	* @type object
	*/
	this.targeting = api.targeting;
	
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
	
	if(!this.connections.adserver){
		this.connections.adserver = new Connection(config.url.adserver);
		this.connections.adserver.name = 'adserver';
	}
	
	if(!this.connections.tracker){
		this.connections.tracker = new Connection(config.url.tracker);
		this.connections.tracker.name = 'tracker';
	}
	
	// Set adserver
	this.adserver = new Adserver();
	this.adserver.connection = this.connections.adserver;
	this.adserver.targeting = this.targeting;
	

	// Set tracker	
	this.tracker = new Tracker();
	this.tracker.connection = this.connections.tracker;
};

exports.Adlayer = Adlayer;