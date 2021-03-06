(function(global){

// Implementation of common.js 1.1
if(!module){
	var node_modules = {};
	var module = {};

	module.exports = {};
	var exports = module.exports;

	var require = function(path){
		return exports;	
	};	
}
/**
* @module utils
* @class Utils
* @static
*/

/**
* Prototype pattern Object.create() in old browsers
* @method copy
* @param {Object} obj
*/
function copy(obj){
	function F(){}
	F.prototype = obj;
	return new F();
}
exports.copy = copy;
/**
* @module utils
* @class Utils
* @static
*/

/**
 * Util method for extend/merge objects
 * @method merge
 */
var merge = function(destination,source) {
    for (var property in source){
		if(source.hasOwnProperty(property)){
			destination[property] = source[property];
		}
	}
    return destination;
};
exports.merge = merge;
/**
* @module utils
* @class Utils
* @static
*/

/**
* @method loadScript
*
* @param {String} url
* @param {Function} sucess
* @param {Function} error
* @async
* @return {element}
*/
function loadScript(url, sucess, error){
    var head = document.getElementsByTagName("head")[0] || document.insertBefore(document.firstChild.firstChild,document.createElement("head"));  
    var script = document.createElement("script");	

	script.onload = sucess || undefined;
	//script.onerror = error || undefined;

    script.type = "text/javascript";
    script.src = url;

    head.appendChild(script);
    return script;
}
exports.loadscript = loadScript;
/**
* @module events
*/
var events = {};

/**
* Implementation minimized of node Event Emitter
*
* @class EventEmitter
* @constructor
*/
var EventEmitter = function(){
	/**
	* Storage of events
	*
	* @attribute listeners
	* @type object
	* @private
	*/
	var listeners = {
		load:[],
		click:[],
		readyStateChange:[]
	};
	
	/**
	* @method listeners
	* @param {String} event Name of event
	* @return {Array}
	*/
	this.listeners = function(event){
		return listeners[event];
	};
	
	/**
	* @method addListener
	* @param {String} event Name of event
	* @param {Function} fn Eventhandler
	* @return {Array}
	*/
	this.addListener = function(event,fn){
		if(!listeners[event]){
			listeners[event] = [];
		}
		listeners[event].push(fn);
		return listeners[event];
	};
	
	/**
	* Shortcut for addListener
	*
	* @method on
	* @param {String} event Name of event
	* @param {Function} fn Eventhandler
	* @return {Array}
	*/
	this.on = function(event, fn){
		return this.addListener(event,fn);
	};
	
	/**
	* Trigger the event
	*
	* @method emit
	* @param {String} event Name of event
	* @return {Array}
	*/
	this.emit = function(event, data){
		var eventListeners = listeners[event];
		if(eventListeners && (eventListeners.length > 0)){
			var i = 0;
			for(i; i < eventListeners.length; i++){
				(data && eventListeners[i].call(this, data)) || eventListeners[i].call();
			}
			return eventListeners;
		}
	};
};
events.EventEmitter = EventEmitter;
exports.events = events;
/**
* QueryString module for handle params
*
* @module queryString
* @public
*/
var queryString = {
	/**
	* @method parse
	* @public 
	*/
	parse:function(qs){
		var sep = "&";
		var eq = "=";
		var obj = {};

		qs = qs.split(sep);
		for(var i = 0; i < qs.length; i++){
			var prop = qs[i];
			prop = prop.split(eq);
			var key = prop[0];
			var value = prop[1];
			
			//is number
			if(!isNaN(value)){
				value = parseInt(value,10);
			}
			
			obj[key] = value;
		}
		return obj;
	},
	/**
	* @method stringify
	* @public 
	*/
	stringify:function(obj){
		var sep = "&";
		var eq = "=";
		var list =  [];
		
		for( var param in obj ){
			if(obj[param] && typeof obj[param] !== 'function'){
				if(typeof obj[param] === 'object'){
					for(var key in obj[param]){
						var value = obj[param][key];
						list.push(param + '[' + key + ']' + eq + value);
					}
				} else {
					list.push(param + eq + obj[param]);
				}
			}
		}
		return list.join(sep);
	}
};
exports.querystring = queryString;
/**
* @module utils
* @class Utils
* @static
*/

/*!
* contentloaded.js
*
* Author: Diego Perini (diego.perini at gmail.com)
* Summary: cross-browser wrapper for DOMContentLoaded
* Updated: 20101020
* License: MIT
* Version: 1.2
*
* URL:
* http://javascript.nwbox.com/ContentLoaded/
* http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
* 
* @method contentLoaded
* @param {Object} win Reference for window object
* @param {Function} fn Callback for when content is loaded
* @async
*/

// @win window reference
// @fn function reference
function contentLoaded(win, fn) {

	var done = false, top = true,

	doc = win.document, root = doc.documentElement,

	add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
	rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
	pre = doc.addEventListener ? '' : 'on',

	init = function(e) {
		if (e.type === 'readystatechange' && doc.readyState !== 'complete') {
			return;
		}
		(e.type === 'load' ? win : doc)[rem](pre + e.type, init, false);
		if (!done && (done = true)) {
			fn.call(win, e.type || e);
		}
	},

	poll = function() {
		try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
		init('poll');
	};

	if (doc.readyState === 'complete') {
		fn.call(win, 'lazy');
	}
	else {
		if (doc.createEventObject && root.doScroll) {
			try { top = !win.frameElement; } catch(e) { }
			if (top) {
				poll();
			}
		}
		doc[add](pre + 'DOMContentLoaded', init, false);
		doc[add](pre + 'readystatechange', init, false);
		win[add](pre + 'load', init, false);
	}
}
exports.contentloaded = contentLoaded;
/**
* @module core
*/

/**
* Core class
*
* @class Core
* @constructor
* @requires merge
*/
var Core = function(){
	var merge = require('../utils/merge').merge;
	var queryString = require('../node_modules/querystring').querystring;
	
	/**
	* @method extend
	* @param {Object} attributes
	* @return {Object} return this to allow chain pattern
	*/
	
	this.extend = function(attributes){
		return merge(this, attributes);
	};
	
};
exports.Core = Core;
/**
* @module core
*/

/**
* Create any event
*
* @class Event
* @constructor
* @extends Core
* @param {Object} attributes
*/
var Event = function( attributes ){
	var Core = require('./core').Core;
	Core.apply(this, arguments);
	
	/**
	* Instance of current date
	* @property date
	* @type date
	* @private
	*/
	var date = new Date();
	
	/**
	* Event type
	* @property type
	* @type string
	*/
	this.type = undefined;
	/**
	* Campaign Id
	* @property campaign_id
	* @type string
	*/
	this.campaign_id = undefined;
	/**
	* @property ad_id
	* @type string
	*/
	this.ad_id = undefined;
	/**
	* @property space_id
	* @type string
	*/
	this.space_id = undefined;
	/**
	* @property {String} site_id Site id
	* @public
	*/
	this.site_id = undefined;
	/**
	* @property {String} page_url Url of the current page
	* @public
	*/
	this.page_url = undefined;
	
	
	/**
	* @property {String} date Date ISO 8601 format
	* @public
	*/
	this.date = undefined;
	/**
	* @property {String} time Time of event
	* @public
	*/
	this.time = undefined;
	/**
	* @property {String} hour
	* @description First part of a time iso
	* @public
	*/
	this.hour = undefined;
	
	
	/**
	* @property {String} ip Visitor ip
	* @public
	*/
	this.ip = undefined;
	/**
	* @property {String} browser User agent or browser
	* @public
	*/
	this.browser = undefined;
	
	/**
	* @property {String} visible Visibility of event
	* @public
	*/
	this.visible = undefined;
	
	/**
	* @method getFullDate
	* @return {String} Even if date is not converted to string return ISOString
	*/
	this.getFullDate = function(){
		if( typeof date === 'object' ){
			date = date.toISOString();
			return date;
		}
		return date;
	};
	
	/*
	* @method __construct
	* @private
	* @return {Object} return this to allow chain pattern
	*/
	var __construct = function(self){
		self = self.extend(attributes);
	}(this);
};

	/**
	* Required List of all required attributes
	* 
	* @property required
	* @type {Array}
	* @static
	*/
	Event.required = [
		'type',
		'ad_id',
		'campaign_id'
	];
	/**
	* @method track
	* @static
	* @return {Object} return the result of method save
	*/
	Event.track = function(attributes){
		return new Event(attributes).save();
	};

	/**
	* @method getDate
	* @public
	* @return {String} The second part of a fulldate splited in T character
	*/
	Event.prototype.getDate = function(){
		return this.getFullDate().split('T')[0];
	};


	/**
	* @method getTime
	* @public
	* @return {String} he second part of a fulldate splited in T character
	*/
	Event.prototype.getTime = function(){
		return this.getFullDate().split('T')[1];
	};

	/**
	* @method getHour
	* @public
	* @return {String || Boolean} String of hour or false
	*/
	Event.prototype.getHour = function(){
		if( this.time ){
			return this.time.split(':')[0];
		}
		return false;
	};
	/**
	* @method validate
	* @public
	* @return {Boolean} true for all attributes and false if any is missing
	*/
	Event.prototype.validate = function(){
		for( var i = 0; i < Event.required.length; i++ ){
			var attr = Event.required[i];
			if( !this[attr] ){
				return false;
			}	
		}
		// default
		return true;
	};
	/**
	* @method toQuery
	* @public
	* @return {String} convert object to network string
	*/
	Event.prototype.toQuery = function(){
		var querystring = require('../node_modules/querystring').querystring;
		return querystring.stringify(this);
	};
	/**
	* @method save
	* @public
	* @return {Error} convert object to network string
	*/
	Event.prototype.save = function(){
		throw new Error('You should override this');
	};

	exports.Event = Event;
/**
* @module core
* @requires events
*/

/**
* Abstract class for ads
*
* @class Ad
* @constructor
* @extends Core
* @uses EventEmiiter
*/
var Ad = function( attributes ){
	var Core = require('./core').Core;
	var EventEmitter = require('../node_modules/events').events.EventEmitter;
	Core.apply(this, arguments);
	EventEmitter.apply(this, arguments);
	/**
	* @event load
	*/
	var loaded = null;
	/**
	* @event placement
	*/
	var placed = null;
	
	
	/**
	* Id of ad
	* @property id 
	* @type string
	*/
	this.id = '';
	/**
	* Name of ad creative
	* @property name 
	* @type string
	*/
	this.name = '';
	/**
	* Id to campaign that belongs to
	* @property campaign_id 
	* @type string
	*/
	this.campaign_id = '';
	/**
	* Ad type
	* @property type 
	* @type string
	*/
	this.type = '';
	/**
	* file Path to ad file
	* @property file 
	* @type string
	*/
	this.file = '';
	/**
	* link destiny link
	* @property link 
	* @type string
	*/
	this.link = '';
	/**
	* status Ad status
	* @property status 
	* @type boolean
	*/
	this.status = true;
	/**
	* Alternative Ad is another instance of Ad with graceful degradation
	* @property alternative 
	* @type object
	*/
	this.alternative = {};
	

	/**
	* @method __construct
	* @private
	* @return {Object} return this to allow chain pattern
	*/
	var __construct = function(self){
		self = self.extend(attributes);
	}(this);
};

exports.Ad = Ad;
/**
* @module core
*/

/**
* Interface for space behaviour
*
* @class ISpaceBehaviour
* @interface ISpaceBehaviour
* @constructor
*/
var ISpaceBehaviour = function(){
	this.getAd = function(context){ throw new Error('Implement it'); };
};
exports.ISpaceBehaviour = ISpaceBehaviour;

/**
* Random behaviour for spaces
*
* @class RandomBehaviour
* @constructor
*/
var RandomSpaceBehaviour = function(){
	/**
	* @method getAd
	* @param {Space} context Expect space 'this' as argument
	* @return {Object} Ad
	*/
	this.getAd = function(context){
		var ads = context.ads;
		var total = ads.length;
		var index = Math.floor(Math.random() * total);
		var ad = ads[index];
		ads.splice(index, 1);
		return ad;
	};
};

/**
* Abstract class for spaces
*
* @class Space
* @constructor
* @extends Core
* @param {Object} attributes
*/
var Space = function( attributes ){
	var Core = require('./core').Core;
	Core.apply(this, arguments);
	/**
	* Unique space id
	* @property id
	* @type string
	*/
	this.id = '';
	/**
	* Type of space
	* @property type
	* @type string
	*/
	this.type = '';
	/**
	* true for active and false for inactive
	* @property status
	* @type boolean
	*/
	this.status = '';
	/**
	* Collection of ads linked to space
	* @property ads
	* @type array
	*/
	this.ads = [];
	
	/**
	* behaviour a part of strategy pattern
	* @property behaviour 
	* @type SpaceBehaviour
	*/
	this.behaviour = {};

	/**
	* @method setBehaviour
	* @param {Object} behaviour 
	* @return {Object} Ad
	*/
	this.setBehaviour = function(behaviour){
		this.behaviour = behaviour;
		return this.behaviour;
	};
	
		
	/**
	* @method getAd
	* @return {Object} Ad
	*/
	this.getAd = function(){
		return this.behaviour.getAd(this);
	};
	
	/*
	* @method __construct
	* @private
	* @returns {Object} return this to allow chain pattern
	*/
	var __construct = function(self){
		self = self.extend(attributes);
		self.setBehaviour(new RandomSpaceBehaviour());
	}(this);
};

	exports.Space = Space;
/**
* @module core
*/

/**
* Abstract class for page
*
* @class Page
* @constructor
* @extends Core
* @param {Object} attributes
*/
var Page = function( attributes ){
	var Core = require('./core').Core;
	Core.apply(this, arguments);
	/**
	* id unique page id
	* @property  id
	* @type string
	*/
	this.id = '';
	/**
	* page name
	* @property name
	* @type string
	*/
	this.name = '';
	/**
	* Collection of page spaces
	* @property spaces
	* @type array
	*/
	this.spaces = [];
	/**
	* Collection of page spaces
	* @property status
	* @type boolean
	*/
	this.status = true;
	
	/*
	* @method __construct
	* @private
	* @returns {Object} return this to allow chain pattern
	*/
	var __construct = function(self){
		self = self.extend(attributes);
	}(this);
};
	/**
	* @method getActiveContent
	* @public
	* @return {Page} the instance itself to improve chainability
	* @require Javascript 1.6
	* __Warning:__ Don't use this in browser, because it can not work in old browsers
	* @todo: should be readonly not modify the object just return filtered value
	*/
	Page.prototype.getActiveContent = function(){
		if( this.spaces && this.spaces.length >= 1 ){
			// Run over and redesign every space (removing ads with status false)
			this.spaces = this.spaces.map(function(space){
				if( space.ads && space.ads.length >= 1 ){
					space.ads = space.ads.filter(function(ad){
						// If ad has status equal to false will auto removed from array
						return ad.status;
					});
				}
				// re-assign modified space to spaces collection
				return space;
			});
		}
		return this;
	};
	exports.Page = Page;
/**
* @module core
*/

/**
* Abstract class for site
*
* @class Site
* @constructor
* @extends Core
*/
var Site = function( attributes ){
	var Core = require('./core').Core;
	Core.apply(this, arguments);
	/**
	* Unique site id
	* @property id 
	* @type string
	*/
	this.id = '';
	/**
	* Name of site
	* @property name
	* @type string
	*/
	this.name = '';
	/**
	* true for active and  false for inactive
	* @property status
	* @type boolean
	* @default true
	*/
	this.status = true;
	/**
	* Collection of all allowed domains
	* @property domains
	* @type array
	*/
	this.domains = [];
	
	/**
	* @method __construct
	* @private
	* @return {Object} return this to allow chain pattern
	*/
	var __construct = function(self){
		self = self.extend(attributes);
	}(this);
};

	/**
	* Find for exact domain or subdomain
	*
	* @method hasDomain
	* @public
	* @param {String} entry - Domain string
	* @return {Boolean} - True when found a domain and false for not
	*/
	Site.prototype.hasDomain = function(entry){
		var self = this;
		var result = false;

		function found(content, context){
			return context.indexOf(content) !== -1;
		}
	
		// Found exact domain ?
		if( found(entry, this.domains ) ){
			result = true;
		} else {
			// Run in all domains
			this.domains.forEach(function(domain){
				// Current domain is a wildcard ?
				var wildcard = found('*', domain);
				if( wildcard ){
					// Remove star
					domain = domain.replace('*', '');
					if( found(domain, entry) ) result = true;
				}
			});
		}
		return result;
	};

	exports.Site = Site;
/**
* @module request
* @requires core, utils
*/

/**
* Abstract class to http requests, connections and responses
*
* @class Http
* @constructor
*/
var Http = function(){
	var Core = require('../domain/core').Core;
	var queryString = require('../node_modules/querystring').querystring;
	Core.apply(this, arguments);
	
	/**
	* @property host
	* @type string
	*/
	this.host = '';
	/**
	* @property protocol
	* @type string
	* @default 'http'
	*/
	this.protocol = 'http';
	/**
	* @property port
	* @type number
	* @default 80
	*/
	this.port = 80;
	/**
	* @property path
	* @type string
	* @default '/'
	*/
	this.path = '';
	/**
	* @property qs
	* @type object
	*/
	this.qs = {};
	/**
	* @property query
	* @type string
	*/
	this.query = '';
	/**
	* @property url
	* @type string
	*/
	this.url = '';

	/**
	* @method isEmptyObject
	* @param {Object} obj Object to verify
	* return {Boolean}
	*/
	function isEmptyObject(obj){
		for(var prop in obj) {
			if(obj.hasOwnProperty(prop)) return false;
		}
		return true;
	}
	
	/**
	* @method getUrl
	* @return {String} full url
	*/
	this.getUrl = function(){
		if( !this.url ){
			this.url = this.protocol;
			this.url += '://';
			this.url += this.host;
			this.url += this.path;
			
			if (!isEmptyObject(this.qs)){
				this.query = [this.query, queryString.stringify(this.qs)].join('&');
			}
			if (this.query){
				this.url += '?' + this.query;	
			}
			
		}
		return this.url;
	};
};
exports.Http = Http;
/**
* @module request
*/

/**
* Abstract class to make http requests
*
* @class HttpRequest
* @constructor
* @param {Object} attributes
* @param {Function} callback
*/
var HttpRequest = function( attributes, callback ){
	var Http = require('./http').Http;
	Http.apply(this, arguments);
	
	/**
	* @property callback
	* @type function
	*/
	this.callback = undefined;
	
	/**
	* @method __construct
	* @private
	* @return {Object} return this to allow chain pattern
	*/
	var __construct = function(self){
		if( typeof attributes === 'string' ){
			self.url = attributes;
		} else {
			self = self.extend(attributes);
		}
		// set callback
		self.callback = callback || self.callback;
	}(this);
};
exports.HttpRequest = HttpRequest;
/**
* @module request
*/

/**
* Loads an img
*
* @class ImgRequest
* @constructor
* @extends HttpRequest
* @param {Object} Attributes
* @param {Function} callback
* @example new ImgRequest({document:document, url}, callback)
*/
var ImgRequest = function(){
	var HttpRequest = require('./http_request').HttpRequest;
	HttpRequest.apply(this, arguments);
};

	/**
	* @method send
	* @public
	* @param {Object} data
	* @return {Object} this to chain
	*/
	ImgRequest.prototype.send = function(data){
		//todo: use merge to data-> query
		if(data) this.qs = data;
		
		// http://www.nczonline.net/blog/2009/07/28/the-best-way-to-load-external-javascript/
		var doc = ImgRequest.document || document;
		
		var img = doc.createElement('img');
		img.src = this.getUrl();
		if( this.callback ){
			img.onload = this.callback.apply({ok:true});
		}
		return this;
	};
	
	/**
	* @property document
	* @type object
	* @static
	*/
	ImgRequest.document = undefined;
	
	/**
	* @method make
	* @static
	* @param {Object} options	
	* @param {Function} callback
	* @return {DOMObject} document
	*/
	ImgRequest.make = function(options, callback, document){
		var instance = new ImgRequest(options, callback);
		if(document){
			instance.document = document;
		}
		instance.send();
		return instance;
	};
	
	exports.ImgRequest = ImgRequest;
/**
* @module request
*/

/**
* Make an http request expeting for jsonp return
*
* @class JsonpRequest
* @constructor
* @extends HttpRequest
* @param {Object} Attributes
* @param {Function} callback
* @example new JsonpRequest({document:document, url}, callback).queryCallback('root.global.callback')
*/
var JsonpRequest = function(){
	var HttpRequest = require('./http_request').HttpRequest;
	HttpRequest.apply(this, arguments);
};
	/**
	* @method queryCallback
	* @public
	* @param {String} string to call in jsonpresult
	* @return {Object} this to chain
	*/
	JsonpRequest.prototype.queryCallback = function(str){
		this.qs.callback = str;
		return this;
	};

	/**
	* @method validate
	* @public
	* @return {Boolean}
	*/
	JsonpRequest.prototype.validate = function(){
		return this.qs.callback !== undefined;
	};

	/**
	* @method send
	* @public
	* @param {Object} options
	* @return {Object} this to chain
	*/
	JsonpRequest.prototype.send = function(data){
		//todo: use merge to data-> query
		if(data) this.qs = data;
		// http://www.nczonline.net/blog/2009/07/28/the-best-way-to-load-external-javascript/
		function loadScript(url, document){
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.src = url;
			document.getElementsByTagName("head")[0].appendChild(script);
			return script;
		}
		loadScript(this.getUrl(), JsonpRequest.document || document);
		return this;
	};
	
	/**
	* @property document
	* @type object
	* @static
	*/
	JsonpRequest.document = undefined;
	
	/**
	* @method make
	* @static
	* @param {Object} options	
	* @param {Function} callback
	* @return {Object} this to chain
	* @example JsonpRequest.make(options, callback).expose(root)
	*/	
	JsonpRequest.make = function(options, callback){
		function wrap(fn){
			function wrapper(data){
				if( data ) {
					fn(null, data);
				} else {
					fn(new Error('No Response'), null);
				}
			}
			return wrapper;
		}
		var instance = new JsonpRequest(options, wrap(callback));
		instance.send();
		return instance;
	};
	
	exports.JsonpRequest = JsonpRequest;
/**
* @module request
*/
function request(){
	
	var JsonpRequest = require('./jsonp_request').JsonpRequest;
	var ImgRequest = require('./img_request').ImgRequest;
	
	return {
		jsonp: JsonpRequest.make,
		get: JsonpRequest.make,
		img: ImgRequest.make
	};
}
exports.request = request;
/**
* @module connections
* @requires request
*/

/**
* @class Connection
* @constructor
* @extends Http
*/
var Connection = function( attributes ){
	var Http = require('../request/http').Http;
	Http.apply(this, arguments);
	
	/**
	* Index of requests
	* @property _index
	* @type number
	* @protected
	*/
	this._index = 0;
	/**
	* Connection name
	* @property name
	* @type string
	*/
	this.name = '';
	/**
	* Requests storage
	* @property requests
	* @type object
	*/
	this.requests = {};
	
	/*
	* @method __construct
	* @private
	* @returns {Object} return this to allow chain pattern
	*/
	var __construct = function(self){
		if( typeof attributes === 'string' ){
			self.url = attributes;
		} else {
			self = self.extend(attributes);
		}
	}(this);
};

/**
* @method id
* @public
* @return {String} return current uuid
*/
Connection.prototype.id = function(){
	return 'n' + this._index;
};

/**
* @method newId
* @public
* @return {String} Increment the index and return a new id
*/
Connection.prototype.newId = function(){
	this._index++;
	return this.id();
};

/**
* @method next
* @public
* @param {Object} req A Request instance
*/
Connection.prototype.next = function(req){
	var sign = this.newId();
	this.requests[sign] = req;
};
/**
* @method getCallbackPath
* @public
* @return {String} path of callback
*/
Connection.prototype.getCallbackPath = function(){
	return [this.name, 'requests', this.id(), 'callback'].join('.');
};
/**
* @method request
* @public
* @return {Object}
*/
Connection.prototype.request = require('../request/request').request;
/**
* @method get
* @public
* @return {Object}
*/
Connection.prototype.get = function(path, data, callback){
	if(typeof data === 'function') {
		callback = data;
	}
	
	// get callback path and asign as callcack querystring;
	data.callback = this.getCallbackPath();
	
	this.path = path;
	this.qs = data;
	
	// Allocate request id namespace
	this.requests[this.id()] = {};
	
	// Make a get request
	this.request().get(this, callback);
	
	// Increment id for the next
	this.newId();
	
	return this;
};
exports.Connection = Connection;
/**
* @module dom
*/

/**
* Abstract class for dom/html elements 
*
* @class DomElement
* @link https://developer.mozilla.org/en/DOM/element
*/
var DomElement = function(){
	/**
	* Id attribute of object
	* @property id
	* @type string
	*/
	this.id = '';
	/**
	* Dom element itself
	* @property element
	* @type object
	*/
	this.element = undefined;
};

	/**
	* @method create
	* @param {String} tagName
	* @param {Object} document
	* @static
	* @return {Object} element
	*/
	DomElement.create = function(tagName, document){
		return document.createElement(tagName);
	};
	/**
	* @method create
	* @param {String} tagName
	* @param {Object} document
	* @public
	* @return {Object} this - Chainable method
	*/
	DomElement.prototype.create = function(tagName, document){
		//	file global || adlayer js module wrapper || passed document context
		document = this.document || global.document || document;
		this.element = DomElement.create(tagName, document);
		return this.element;
	};
	
	/**
	* @method setAttributes
	* @param {Object} attributes
	* @public
	* @return {Object} this - Chainable method
	*/
	DomElement.prototype.setAttributes = function(attributes){
		var merge = require('../utils/merge').merge;
		merge(this.element, attributes);
	};
	
	/**
	* @method append
	* @param {Object} child
	* @public
	* @return {Object} this - Chainable method
	*/
	DomElement.prototype.append = function(child){
		this.element.appendChild(child);
		return this;
	};
	/**
	* @method findParentTag
	* @param {String} tag UPPERCASE tag name
	* @public
	* @return {Object} parentElement
	*/
	DomElement.prototype.findParentTag = function(tag){
		var parent = this.element.parentNode;
		if(parent){
			while(parent.nodeName != tag){
				parent = parent.parentNode;
			}
			return parent;
		}
		return false;
	};
	/**
	* @method addDomEventListener
	* @param {String} type Event name like 'click', 'load', 'mouseover'
	* @param {Function} eventListener Callback for event trigger
	* @public
	* @return {Object} return this to allow chainability
	*/
	DomElement.prototype.addDomEventListener = function(type, eventListener){
		if(typeof addEventListener === 'function'){
			this.element.addEventListener(type, eventListener, false);
		} else if(typeof attachEvent === 'function'){
			this.element.attachEvent('on' + type, eventListener);
		} else {
			this.element['on' + type] = eventListener;
		}
		return this;
	};


	exports.DomElement = DomElement;
/**
* @module dom
* @requires core, events
*/
(function(){
	
	// modules
	var DomElement = require('./dom_element').DomElement;
	var Ad = require('../domain/ad').Ad;
	var Event = require('../domain/event').Event;
	
	
	/**
	* Base for any type of Dom ads.
	*
	* @class AdDom
	* @constructor
	* @extends DomElement
	* @uses Ad
	*/
	var AdDom = function(){
		Ad.apply(this, arguments);

		/**
		* Url base of tracker
		* @property trackerUrl
		* @type string
		* @public
		*/
		this.trackerUrl = null;
		
		/**
		* Information about the ad impression
		* @property impression
		* @type string
		* @public
		*/
		this.impression = {};

	};
	// extends DomElement
	AdDom.prototype = new DomElement();
	
	/**
	* @method getSpaceId
	* @return {String} return the id of the first parent div
	*/
	AdDom.prototype.getSpaceId = function(){
		var node = this.findParentTag('DIV');
		return node.id;
	};
	
	/**
	* @method isVisible
	*/
	AdDom.prototype.isVisible = function(){
		//IE 5 does not support
		//http://reference.sitepoint.com/javascript/Node/ownerDocument
		var document = this.element.ownerDocument;
		
		//http://stackoverflow.com/questions/10173236/window-innerheight-ie8-alternative
		var doc = {
			top: document.body.scrollTop || document.documentElement.scrollTop,
			left: document.body.scrollLeft || document.documentElement.scrollLeft,
			height: document.documentElement.clientHeight,
			width: document.documentElement.clientWidth
		};
		
		var element = {
			top: this.element.offsetTop,
			left: this.element.offsetLeft,
			height: this.element.offsetHeight,
			width: this.element.offsetWidth,
			style: document.defaultView.getComputedStyle(this.element, null)
		}
		
		element.halfHeight = element.height/2;
		element.halfWidth = element.width/2;

		var horizontalVisible = ((element.left + element.halfWidth) <= doc.width) && ((element.left + element.halfWidth) >= doc.left) && (element.left >= 0);
		var verticalVisible = ((element.top + element.halfHeight) <= doc.height) && ((element.top + element.halfHeight) >= doc.top) && (element.top >= 0);
		var display = true;
		var visibility = true;
		if(element.style){
			display = element.style.display != 'none';
			visibility = element.style.visibility != 'hidden';
		}
		var result = (horizontalVisible && verticalVisible && display && visibility);
		return result;
	};
	
	/**
	* @method setImpression
	* @param {Object} space
	* @param {Object} config
	* @example
		var config = {
			type: 'impression',
			
			site_id: config.site_id,
			domain: config.domain,
			page_url: config.page_url,
			page_id: config.page_id,
			
			ad_id: ad.id,
			campaign_id: ad.campaign_id,
			space_id: space.id
		}
		new AdDom(space, config);
	*/
	AdDom.prototype.setImpression = function(space, config){
		//IE 5 does not support
		//http://reference.sitepoint.com/javascript/Node/ownerDocument
		var document = this.element.ownerDocument;
		//http://stackoverflow.com/questions/10173236/window-innerheight-ie8-alternative
		var doc = {
			height: document.documentElement.clientHeight,
			width: document.documentElement.clientWidth
		};
		
		var horizontalVisible = (this.element.offsetLeft <= doc.width) && (this.element.offsetLeft >= 0);
		var verticalVisible = (this.element.offsetTop <= doc.height) && (this.element.offsetTop >= 0);
	
		config.visible = this.isVisible();
		config.type = 'impression';
		config.ad_id = this.id;
		
		if(space){
			config.space_id = space.id || delete config.space_id;
		}
		
		config.campaign_id = this.campaign_id;
		this.impression = config;
		return this.impression;
	};
	
	/**
	* @method getClickTag
	* @param {Object} config
	* @return {String} the full url to track this link
	* @example http://tracker.adlayerapp.com/click/10?&campaign_id=1235&link=http://www.adlayer.com.br
	*/
	AdDom.prototype.getClickTag = function(config){
		// Tracker url
		var trackerUrl = this.trackerUrl;

		var event = new Event({
			ad_id: this.id,
			type: 'click',
			campaign_id: this.campaign_id,
			space_id: this.getSpaceId() || undefined,
			site_id: config.site_id || undefined,
			page_id: config.page_id || undefined,
			page_url: config.page_url || undefined,
			link: escape(this.link)
		});

		if( event.validate() && this.link ){
			var url = [trackerUrl, 'click', this.id].join('/');
			url = url + '?' + event.toQuery();
			return url;
		}
		return false;
	};
	
	exports.AdDom = AdDom;
	
	
	
})();
/**
* @module dom
* @requires spaces
*/
(function(){
	
	// modules
	var DomElement = require('./dom_element').DomElement;
	var Space = require('../domain/space').Space;

	/**
	* Space dom
	*
	* @class SpaceDom
	* @extends Space
	* @uses Spaces
	*/
	var SpaceDom = function(){
		// extends Space
		Space.apply(this, arguments);
		
		/**
		* Hash of all placements during this pageview on this space
		* @property placements
		* @type object
		*/
		this.placements = {};
		
		/**
		* The current rendered ad
		* @property ad
		* @type object
		*/
		this.ad = {};
	};
	// extends DomElement
	SpaceDom.prototype = new DomElement();
	
	/**
	* Append the ad.element as a child and emit the ad event 'placement'
	*
	* @method placeAd
	* @param {Object} DomElement Ad to append in element
	* @return {Object} return this to chain methods
	*/
	SpaceDom.prototype.placeAd = function(ad){
		this.element.innerHTML = '';
		this.element.appendChild(ad.element);
		ad.emit('placement');
		this.ad = ad;
		return this;
	};
	
	/**
	* @method getElement
	* @return {Object} return the DomElement
	*/
	SpaceDom.prototype.getElement = function(){
		return this.document.getElementById(this.id);
	};
	
	exports.SpaceDom = SpaceDom;
})();

/**
* @module ads
* @requires utils
*/

/**
* @class Swf
* @constructor
*/
var Swf = function(){
	var queryString = require('../node_modules/querystring').querystring;
	/**
	* Alignment of html content.
	* @property align
	* @type string
	*/
	this.align = "center";
	/**
	* Control right click menu options (true, false).
	* @property menu
	* @type boolean
	*/
	this.menu = false;
	/**
	* @property quality
	* @type string
	*/
	this.quality = "high"; //low,autolow,autohigh,medium,high,best ;
	/**
	* @property scale
	* @type string
	*/
	this.scale = "noscale"; //default,noborder,exactfit,noscale
	/**
	* @property wmode
	* @type string
	*/
	this.wmode = "transparent"; //window,opaque,transparent
	/**
	* @property type
	* @type string
	*/
	this.type = "application/x-shockwave-flash";
	/**
	* @property allowScriptAccess
	* @type string
	*/
	this.allowScriptAccess = "always"; // "always", "sameDomain", and "never".
	this.allowNetworking = "all";
	
	/**
	* @method getSrc
	* @return {String} src Will return the preloder url if defined
	*/
	this.getSrc = function(){
		var self = this;
		if(!this.preloader){
			return this.src;
		}

		var url = this.preloader + '?' + queryString.stringify({
			src: self.src,
			link: escape(self.link),
			callback: self.callback, 
			value: self.id
		});

		return url;
	};
};
exports.Swf = Swf;
/**
* @module ads
* @requires dom
*/
(function(){
	var AdDom = require('../dom/ad_dom').AdDom;
	var Swf = require('./swf').Swf;
	
	/**
	* Create embedable ads
	*
	* @class EmbedAd
	* @constructor
	* @param {Object} attributes
	* @extends AdDom
	* @uses Swf
	*/
	var EmbedAd = function(data){
		AdDom.apply(this, arguments);
		Swf.apply(this, arguments);
		this.trackerUrl = data.trackerUrl;
		
		var __construct = (function(self){
			self.create('EMBED');
			self.link = self.getClickTag({});
			self.element.src = self.getSrc();
			self.element.setAttribute('height', self.height);
			self.element.setAttribute('width', self.width);
			self.element.setAttribute('type', self.type);
			self.element.setAttribute('allowScriptAccess', self.allowScriptAccess);
			self.element.setAttribute('allowNetworking', self.allowNetworking);
			self.element.setAttribute('menu', self.menu);
			self.element.setAttribute('wmode', self.wmode);
			self.element.setAttribute('scale', self.scale);
			self.element.setAttribute('quality', self.quality);
			
//			self.setAttributes(self);
			
			self.element.id = self.id;
			return self.element;
		})(this);
	};
	EmbedAd.prototype = new AdDom();
	exports.EmbedAd = EmbedAd;
})();
/**
* @module ads
* @requires dom
*/
(function(){
	var AdDom = require('../dom/ad_dom').AdDom;
	var Swf = require('./swf').Swf;
	
	/**
	* Create embedable ads
	*
	* @class ObjectAd
	* @constructor
	* @param {Object} attributes
	*
	* @extends AdDom
	* @uses Swf
	*/	
	var ObjectAd = function(){
		var superclass = this;
		AdDom.apply(this, arguments);
		Swf.apply(this, arguments);
	
		/**
		* @property CLASSID
		* @type string
		* @final
		* @private
		*/
		var CLASSID = "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";
		/**
		* @property CODEBASE
		* @type string
		* @final
		* @private
		*/
		var CODEBASE = "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0";
		/**
		* @property PLUGINSPAGE
		* @type string
		* @final
		* @private
		*/
		var PLUGINSPAGE = "http://www.macromedia.com/go/getflashplayer";
		
		/** 
		* @class Param
		* @constructor
		* @param {String} name
		* @param {String} value
		* @return HTMLElement
		*/
		var Param = function(name, value){
			/**
			* @property name
			* @type string
			*/
			this.name = name;
			/**
			* @property value
			* @type string
			*/
			this.value = value;
			/**
			* @property element
			* @type HTMLElement
			*/
			this.element = superclass.create("param");
			
			this.element.setAttribute("name", this.name);
			this.element.setAttribute("value", this.value);
			return this.element;
		};
	
		var __construct = (function(self){
			self.create('OBJECT');
			self.element.src = self.src;
			
			self.element.setAttribute("data", self.src);
			self.element.setAttribute("classid", CLASSID);
			self.element.setAttribute("codebase", CODEBASE);
			
			// http://stackoverflow.com/questions/1168494/how-do-i-programmatically-set-all-objects-to-have-the-wmode-set-to-opaque
			var clone = self.element.cloneNode(true);
			
			self.link = self.getClickTag({});
			clone.appendChild(new Param("movie", self.getSrc()));
			clone.appendChild(new Param("quality", self.quality));		
			clone.appendChild(new Param("src", self.src));
			clone.appendChild(new Param("menu", self.menu));
			clone.appendChild(new Param("scale", self.scale));
			clone.appendChild(new Param("allowScriptAccess", self.allowScriptAccess));
			clone.appendChild(new Param("allowNetworking", "all"));
			clone.appendChild(new Param("base", self.base));
			clone.appendChild(new Param("wmode", self.wmode));

			self.element = clone;
			self.element.id = self.id;
			return self.element;
		})(this);
	};
	ObjectAd.prototype = new AdDom();
	exports.ObjectAd = ObjectAd;
})();
/**
* @module ads
*/

(function(){
	var AdDom = require('../dom/ad_dom').AdDom;
	/**
	* @class ImgAd
	* @extends AdDom
	*/
	var ImgAd = function(){
		AdDom.apply(this, arguments);
		
		var __construct = (function(self){
			// Default create the image
			self.create('img');
			self.element.src = self.src;
			var img = self.element;
			
			// Set id in the image or in the link wrapper
			self.element.id = self.id;
			self.addDomEventListener('load', function(){
				self.emit('load');
			});
			
			if(self.link){
				// subscribe img with link
				self.create('a');
				self.element.href = self.link;
				
				self.on('placement', function(){
					// Setting click tag in ad element
					var clickTag = self.getClickTag(self.impression);
					self.element.href = clickTag;
				});
				
				self.append(img);
				self.element.onclick = function(){
					window.open(self.element.href);
					return false;
				}
			}
			
			self.element.style.height = self.height + 'px';
			self.element.style.width = self.width + 'px';
			self.element.setAttribute('height', self.height);
			self.element.setAttribute('width', self.width);
			
			return self.element;
		})(this);
	};
	ImgAd.prototype = new AdDom();
	exports.ImgAd = ImgAd;
})();
/**
* @module ads
*/

(function(){
	var AdDom = require('../dom/ad_dom').AdDom;
	/**
	* @class ImgAd
	* @extends AdDom
	*/
	var HtmlAd = function(){
		AdDom.apply(this, arguments);
		
		var __construct = (function(self){
			// Default create the image
			self.create('iframe');
			self.element.src = self.src;
			var iframe = self.element;
			
			// Set id in the image or in the link wrapper
			self.element.id = self.id;
			self.addDomEventListener('load', function(){
				self.emit('load');
			});
			
			self.element.style.height = self.height + 'px';
			self.element.style.width = self.width + 'px';
			self.element.setAttribute('height', self.height);
			self.element.setAttribute('width', self.width);
			self.element.setAttribute('frameborder', '0');
			self.element.setAttribute('scrolling', 'no');
						
			return self.element;
		})(this);
	};
	HtmlAd.prototype = new AdDom();
	exports.HtmlAd = HtmlAd;
})();
/**
* @module ads
*/
(function(){
	var Embed = require('./embed_ad.js').EmbedAd;
	var ObjectAd = require('./object_ad.js').ObjectAd;
	/**
	* @class FlashAd
	* @constructor
	*/
	var FlashAd = function(data){
		/**
		* @method __construct
		* @private
		*/
		var __construct = (function(self){
			if(self.browser){
				return new ObjectAd(data);
			} else {
				return new Embed(data);
			}

		})(this);
		return __construct;
	};
	exports.FlashAd = FlashAd;
})();
/**
* Handle all supported ad types (flash and image)
*
* @module ads
* @main
* @example
	var ads = require('./src/ads/ads').ads;
	ads.create({type: 'flash'});
*/
(function(){
	
	exports.ads = (function(){
		var FlashAd = require('./flash_ad.js').EmbedAd;
		var Img = require('./img_ad.js').ImgAd;
		var HtmlAd = require('./html_ad.js').HtmlAd;
		return {
			/**
			* @method create
			* @param {Object} data Config to create the ad
			*/
			create: function(data){
				// mixin
				data.id = data._id || data.id;
				data.src = data.file;
				delete data.file;
				delete data._id;

				switch(data.type){
					case 'flash':
						data.preloader = 'http://xframe.adlayerjavascriptsdk.com/main.swf';
						//data.preloader = 'http://localhost/xframe/main.swf';
						data.callback = 'adlayer.markAdAsLoaded';
						return new FlashAd(data);
					case 'image':
						return new Img(data);
					case 'html':
						return new HtmlAd(data);
				}
			}
		};
	})();
	
})();
/**
* @module spaces
* @requires dom, ads
*/

(function(){
	
	// modules
	var SpaceDom = require('../dom/space_dom').SpaceDom;
	var ads = require('../ads/ads').ads;

	/**
	* Basic Space
	*
	* @class BasicSpace
	* @extends SpaceDom
	* @uses SpaceDom
	*/
	var BasicSpace = function(){
		// extends Space
		SpaceDom.apply(this, arguments);
	};
	// extending DomElement
	BasicSpace.prototype = new SpaceDom();

	/**
	* When there are ads fetched for this space, select some Ad 
	* from the fecthed collection using some configurable behaviour (Random by default).
	*
	* Create and initalize the seleted as an AdDom instance,
	* register the 'Load' event, in order to track the impression when the file is fully loaded.
	* Place the ad on the DomSpace, which will automatically trigger the 'Ad Placement' event.
	*
	* @method init
	* @param {Object} tracker A instance of Tracker
	* @param {Object} config Data to tracked
	* @public
	*/
	BasicSpace.prototype.init = function(tracker, config){
		if(this.ads && this.ads.length > 0){
			// Create an ad for space from 'this.ads' array, Selection made by behaviour by default will be random
			var content = this.getAd();
			content.trackerUrl = tracker.connection.getUrl();
			var ad = ads.create(content);
			ad.trackerUrl = tracker.connection.getUrl();
			
			var self = this;
			ad.on('load', function(){
				ad.setImpression(self, config);
				tracker.track(ad.impression);	
			});
			
			// Placing ad in space
			this.placeAd(ad);
		}
		return this;
	};
	
	exports.BasicSpace = BasicSpace;
})();
/**
* @module spaces
*/

(function(){
	var BasicSpace = require('./basic_space').BasicSpace;
	/**
	* Represents the type Expander space
	*
	* @class ExpandableSpace
	* @extends BasicSpace
	*/
	var ExpandableSpace = function(){
		BasicSpace.apply(this, arguments);
		
		/**
		* @event expandEvent
		* @example 
			var space = new ExpandableSpace();
			space.addDomEventListener(space.exapandEvent)
		*/
		this.expandEvent = 'mouseover';
		
		/**
		* @event retreatEvent
		* @example 
			var space = new ExpandableSpace();
			space.addDomEventListener(space.retreatEvent)
		*/
		this.retreatEvent = 'mouseout';
		
		/**
		* Get or create the element
		* Set the element id and sizes
		*
		* @method __construct
		* @param {Object} self
		* @private
		*/
		var __construct = (function(self){
			self.element = self.element || self.getElement() || self.create('DIV');
			self.element.id = self.id;
			self.element.style.height = self.height;
			self.element.style.width = self.width;
			// http://blog.vamapaull.com/using-externalinterface-and-js-to-make-an-expandable-flash-banner/
			self.element.style.position = "absolute";
			
			self.addDomEventListener(self.expandEvent, function(){
				self.expand();
				self.state = 'expanded';
			});
			
			self.addDomEventListener(self.retreatEvent, function(){
				self.retract();
				self.state = 'retreated';
			});
			self.retract();
		})(this);
	};
	ExpandableSpace.prototype = new BasicSpace();
	
	/**
	* @method clip
	* @param {Number} width
	* @param {Number} height
	* @return {Object}
	*/
	ExpandableSpace.prototype.clip = function(width, height){
		this.element.style.clip = "rect(0px " + width + " " + height + " 0px)";
		return this;
	};
	
	/**
	* @method expand
	* @public
	* @return {Object}
	*/
	ExpandableSpace.prototype.expand = function(){
		var childAd = this.element.firstChild;
		if(childAd){
			var width = childAd.style.width || (childAd.width + 'px');
			var height = childAd.style.height || (childAd.height + 'px');
			this.clip(width, height);
			return this;
		}
	};
	
	/**
	* @method retract
	* @public
	* @return {Object}
	*/
	ExpandableSpace.prototype.retract = function(){
		this.clip(this.width, this.height);
		return this;
	};
	

	exports.ExpandableSpace = ExpandableSpace;
})();
/**
* @module spaces
*/

(function(){
	var BasicSpace = require('./basic_space').BasicSpace;
	/**
	* Represents the type Floater
	* @class FloaterSpace
	* @extends BasicSpace
	*/
	var FloaterSpace = function(){
		BasicSpace.apply(this, arguments);
		/**
		* @method close
		* @public
		*/
		this.close = function(){
			var space = this.element;
			space.parentNode.removeChild(space);
			delete this.element;
		};
		
		var __construct = (function(self){
			self.element = self.element || self.getElement() || self.create('DIV');
			self.element.id = self.id;
			self.element.style.height = self.height;
			self.element.style.width = self.width;
			self.element.style.position = 'absolute';
			
			var bt = self.document.createElement('BUTTON');
			bt.innerHTML = 'x';
			bt.onclick = function(){
				self.close();
			};
			self.append(bt);
			
		})(this);
	};
	FloaterSpace.prototype = new BasicSpace();
	exports.FloaterSpace = FloaterSpace;
})();
/**
* @module spaces
*/

(function(){
	var BasicSpace = require('./basic_space').BasicSpace;
	/**
	* Represents the type Static
	* 
	* @class StaticSpace
	* @extends BasicSpace
	*/	
	var StaticSpace = function(){
		BasicSpace.apply(this, arguments);
		var __construct = (function(self){
			self.element = self.element || self.getElement() || self.create('DIV');
			self.element.style.height = self.height;
			self.element.style.width = self.width;
			self.element.id = self.id;
		})(this);
	};
	StaticSpace.prototype = new BasicSpace();
	
	exports.StaticSpace = StaticSpace;
})();
/**
* Handle all suported advertising spaces (Floater, Expandable and Static)
*
* @module spaces
* @submodule spaces-spaces
* @main
* @example
	spaces.spaces.create({type:'floater'});
*/
(function(){	
	exports.spaces = (function(){
		var Expandable = require('./expandable_space.js').ExpandableSpace,
			Floater = require('./floater_space.js').FloaterSpace,
			Static = require('./static_space.js').StaticSpace;
		
		return {
			/**
			* @method create
			* @param {Object} data Config to create the Space
			*/
			create: function(data){
				data.id = data._id || data.id;
				data.width = data.width || data.size.width;
				data.height = data.height || data.size.height;	
				delete data._id;
				delete data.size;

				switch(data.type){
					case 'expandable':
						return new Expandable(data);
					case 'floater':
						return new Floater(data);
					case 'static':
						return new Static(data);
				}
			}
		};
	})();
	
})();
/**
* All configuration for adlayer api
*
* @module api
* @submodule config
*/
exports.config = {
	/**
	* Adserver and tracker connection options
	*
	* @attribute url
	*/	
	url: {
		adserver: {
			host: 'jocasta.adlayerapp.com'
		},
		tracker: {
			host: 'tracker.adlayerapp.com'
		}
	},
	/**
	* Number of ads per spaces download for every request
	*
	* @attribute adsPerSpace
	*/
	adsPerSpace: 1,
	/**
	* Page specfic configurations
	*
	* @attribute page
	*/
	page: {
		scriptTagId: 'adlayerScript'
	},
	/**
	* Loaded widgets list
	*
	* @attribute widgets
	*/
	widgets: {}
};
/**
* @module tracker
* @requires utils, core
*/
(function(){
	var copy = require('../utils/copy').copy;
	var Event = require('../domain/core').Event;
	/**
	* High level API to handle with Adlayer Tracker server
	*
	* @class Tracker
	* @constructor
	*/
	function Tracker(){
		/**
		* @property connection
		* @type Object
		* @public
		*/
		this.connection = {};
	}
	/**
	* @method track
	* @param {Object} data All data to track in an event
	* @public
	* @returns {undefined}
	*/
	Tracker.prototype.track = function(data){

		var event = new Event(data);

		var opts = copy(this.connection);
		opts.host = opts.host;
		opts.path = '/' + event.type + '/' + event.ad_id;

		//  validate in client is necessary ? or is it just slow
		if( event.validate() ){
			opts.qs = event;
			var req = request().img(opts, function(err, data){
				if(err){
					throw new Error({'message': 'impossible to track'});
				}
			});
			this.connection.next(req);
		}
	};
	exports.Tracker = Tracker;
})();
/**
* @module adserver
*/
(function(){
	var merge = require('../lib/src/utils/merge').merge;
	
	/**
	* High level API to handle with Adlayer Adserver.
	*
	* This is the offical js client to deal with [Adlayer](http://adlayer.com.br) [Adserver HTTP API](http://github.com/adlayer/adserver-api-docs)
	*
	* You have to pass the connection instace with the path to Adserver
	* @class Adserver
	* @constructor
	* @example Creating a instance of Adserver
	
		var config = require('config').config;
		var Connection = require('connection').Connection;
		var adserver = new Adserver(new Connection(config.url.adserver));
	*
	*/
	var Adserver = function(connection, targeting){
		/**
		* The instace of connection to be used as adserver
		*
		* @property connection
		* @type Object
		*/
		this.connection = connection;
		/**
		* List of user profile data
		*
		* @property targeting
		* @type Object
		*/
		this.targeting = targeting;
	};
	
	/**
	* Main method to make http requests
	*
	* @method request
	* @param {String} path path to request in server
	* @param {Object} query query string to request
	* @param {Function} callback
	* @public
	* @example 
		adserver.request('ads/:id', {domain: window.location.host}, function(err, data){
			if(!err){
			 console.log(data);
			}
		});
	*/
	Adserver.prototype.request = function(path, query, callback){
		var sign = this.connection.newId();
		var opts = copy(this.connection);
		opts.host = opts.host;
		opts.path = path;
		
		opts.qs = query || {};
		opts.qs.targeting = this.targeting || {};
		
		opts.qs.callback = 'adlayer.connections.' + opts.name + '.requests.' + sign + '.callback';
		var req = request().get(opts, callback);
		this.connection.requests[sign] = req;
	};
	/**
	* Access to 'pages' endpoint
	* @method pages
	* @param {String} id
	* @param {Object} query query string to request
	* @param {Function} callback
	* @public
	* @example 
		adserver.pages(':id', {domain: window.location.host}, function(err, data){
			if(!err){
			 console.log(data);
			}
		});
	*/
	Adserver.prototype.pages = function(id, query, callback){
		this.request('/pages/' + id, query, callback);
	};
	/**
	* Access to 'ads' endpoint
	* @method ads
	* @param {String} id
	* @param {Object} query query string to request
	* @param {Function} callback
	* @public
	* @example 
		adserver.ads(':id', {domain: window.location.host}, function(err, data){
			if(!err){
			 console.log(data);
			}
		});
	*/
	Adserver.prototype.ads = function(id, query, callback){
		this.request('/ads/' + id, query, callback);
	};
	
	/**
	* Access to 'spaces' endpoint
	* @method spaces
	* @param {String} id
	* @param {Object} query query string to request
	* @param {Function} callback
	* @public
	* @example 
		var adserver = new Adserver(new Connection());
		adserver.spaces(':id', {domain: window.location.host}, function(err, data){
			if(!err){
			 console.log(data);
			}
		});
	*/
	Adserver.prototype.spaces = function(id, query, callback){
		this.request('/spaces/' + id, query, callback);
	};
	
	exports.Adserver = Adserver;
})();
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
	* Plugins to be triggered by widgets
	*
	* @submodule plugins
	*/
	this.plugins = api.plugins || null;
	
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
	* Plugins to be triggered by widgets
	*
	* @submodule plugins
	*/
	api.plugins = api.plugins || null;
	
	/**
	* @submodule config
	*/
	api.config = defaultConfig;
	for( var key in config ){
		var option = config[key];
		if(option){
			api.config[key] = option;
		}
	}
	
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
/**
* @module api
* @requires Events, dom, ads, request, spaces
*/
(function(){
	var EventEmitter = require('../node_modules/events').events.EventEmitter;
	var AdDom = require('../lib/dom/ad_dom').AdDom;
	var ads = require('./lib/src/ads/ads').ads;
	var request = require('../request/request').request;
	var spaces = require('../spaces/spaces').spaces;
	
	/**
	* @class AdApi
	* @constructor
	* @extends AdDom
	* @uses EventEmitter
	*/
	var AdApi = function(){
		AdDom.apply(this, arguments);
		
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
	};
	
	/**
	* @method getData
	* @param {Function} callback
	* @public
	*/
	AdApi.prototype.getData = function(callback){
		this.adserver.ads(this.id, null, callback);
	};
	
	
	/**
	* @method init
	* @param {Object} tracker The instance of tracker to be stored in this.tracker
	* @param {Function} callback
	* @async
	* @public 
	*/
	AdApi.prototype.init = function(tracker, callback){
		var self = this;
		// Get all page data
		this.getData(function(err, data){
			if(!err && data){
				data.trackerUrl = tracker.connection.getUrl();
				var ad = ads.create(data);
				ad.trackerUrl = tracker.connection.getUrl();
				
				delete data.src;
				delete data.height;
				delete data.status;
				delete data.width;
				delete data.link;
				delete data.type;
				
				// Listener for 'LOAD' event
				ad.on('load', function(){
					ad.setImpression(null, data);
					tracker.track(ad.impression);
				});
				
				ad.emit('placement');
				self.element = ad.element;
				callback.call(ad);
			}
		});
		return this;	
	};
	
	exports.AdApi = AdApi;
})();
/**
* @module widgets
*/
(function(window){
	
	/**
	* @method getElementsByClass
	* @param {String} searchClass className to find
	* @param {Object} node Dom node to look up
	* @param {String} tag Restrict find for some tag
	* @private
	*/
	function getElementsByClass(searchClass,node,tag) {
		var classElements = [];
		if ( node === null )
			node = document;
		if ( tag == null )
			tag = '*';
		var els = node.getElementsByTagName(tag);
		var elsLen = els.length;
		var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
		for (i = 0, j = 0; i < elsLen; i++) {
			if ( pattern.test(els[i].className) ) {
				classElements[j] = els[i];
				j++;
			}
		}
		return classElements;
	}
	
	/**
	* @method initialization
	* @async
	* @private
	*/
	(function initialization(){
		var api = window.adlayer;
		var AdApi = api.lib.AdApi;
		var config = api.config;
		var contentloaded = require('../lib/src/utils/contentloaded').contentloaded;
		if(config.widgets.ads){
			return false;
		} else {
			config.widgets.ads	= true;
		}
		contentloaded(global, function(){
			var document = global.document;
			var placeholders = getElementsByClass('adlayer_ad_placeholder', document);
			
			for(var i = 0; i < placeholders.length; i++){
				var placeholder = placeholders[i];
				var id = placeholder.id;
				var parent = placeholder.parentNode;

				var ad = new AdApi({
					id: id,
					adserver: api.adserver,
					document: document
				});
			
				(function(placeholder, parent, ad){
					ad.init(api.tracker, function(){
//						var old = parent.removeChild(placeholder);
						api.ads[this.id] = this;
//						parent.insertBefore(this.element, reference);
						if(document.getElementById(ad.id) === placeholder){
							parent.replaceChild(this.element, placeholder);	
						}
					});
				})(placeholder, parent, ad);
			}
		});
	})();
	
})(this);
})(this);