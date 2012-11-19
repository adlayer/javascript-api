(function(global){

// Implementation of common.js
var node_modules = {};
var module = {};

module.exports = {};
var exports = module.exports;

var require = function(path){
	return exports;	
};
// Prototype pattern Object.create() in old browsers
function copy(obj){
	function F(){}
	F.prototype = obj;
	return new F();
}
exports.copy = copy;
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
 * @method loadScript
 * @param {string}
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
* Implementation minimized of node event emitter
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
	this.emit = function(event){
		var eventListeners = listeners[event];
		if(eventListeners && (eventListeners.length > 0)){
			var i = 0;
			for(i; i < eventListeners.length; i++){
				eventListeners[i].call();
			}
			return eventListeners;
		}
	};
};
events.EventEmitter = EventEmitter;
exports.events = events;
/**
* QueryString module for handle params
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
			if( obj[param] && typeof obj[param] !== 'function'){
				list.push(param + eq + obj[param]);
			}
		}
		return list.join(sep);
	}
};
exports.querystring = queryString;
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
	this.type = '';
	/**
	* Campaign Id
	* @property campaign_id
	* @type string
	*/
	this.campaign_id = '';
	/**
	* @property ad_id
	* @type string
	*/
	this.ad_id = '';
	/**
	* @property space_id
	* @type string
	*/
	this.space_id = '';
	/**
	* @property {String} site_id Site id
	* @public
	*/
	this.site_id = '';
	/**
	* @property {String} page_url Url of the current page
	* @public
	*/
	this.page_url = '';
	
	
	/**
	* @property {String} date Date ISO 8601 format
	* @public
	*/
	this.date = '';
	/**
	* @property {String} time Time of event
	* @public
	*/
	this.time = '';
	/**
	* @property {String} hour
	* @description First part of a time iso
	* @public
	*/
	this.hour = '';
	
	
	/**
	* @property {String} ip Visitor ip
	* @public
	*/
	this.ip = '';
	/**
	* @property {String} browser User agent or browser
	* @public
	*/
	this.browser = '';
	
	/**
	* @method getFullDate
	* @returns {String} Even if date is not converted to string return ISOString
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
	* @returns {Object} return this to allow chain pattern
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
	* @returns {Object} return the result of method save
	*/
	Event.track = function(attributes){
		return new Event(attributes).save();
	};

	/**
	* @method getDate
	* @public
	* @returns {String} The second part of a fulldate splited in T character
	*/
	Event.prototype.getDate = function(){
		return this.getFullDate().split('T')[0];
	};


	/**
	* @method getTime
	* @public
	* @returns {String} he second part of a fulldate splited in T character
	*/
	Event.prototype.getTime = function(){
		return this.getFullDate().split('T')[1];
	};

	/**
	* @method getHour
	* @public
	* @returns {String || Boolean} String of hour or false
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
	* @returns {Boolean} true for all attributes and false if any is missing
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
	* @returns {String} convert object to network string
	*/
	Event.prototype.toQuery = function(){
		var querystring = require('../node_modules/querystring').querystring;
		return querystring.stringify(this);
	};
	/**
	* @method save
	* @public
	* @returns {Error} convert object to network string
	*/
	Event.prototype.save = function(){
		throw new Error('You should override this');
	};

	exports.Event = Event;
/**
* @module core
*/

/**
* Abstract class for ads
*
* @class Ad
* @constructor
* @extends Core
*/
var Ad = function( attributes ){
	var Core = require('./core').Core;
	var EventEmitter = require('../node_modules/events').events.EventEmitter;
	Core.apply(this, arguments);
	EventEmitter.apply(this, arguments);
	
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
	* @returns {Object} return this to allow chain pattern
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
	* @returns {Object} return this to allow chain pattern
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
	* @returns {Boolean} - True when found a domain and false for not
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
	* @returns {String} full url
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
	* @returns {Object} return this to allow chain pattern
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
	* @returns {Object} this to chain
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
	* @returns {DOMObject} document
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
	* @returns {Object} this to chain
	*/
	JsonpRequest.prototype.queryCallback = function(str){
		this.qs.callback = str;
		return this;
	};

	/**
	* @method validate
	* @public
	* @returns {Boolean}
	*/
	JsonpRequest.prototype.validate = function(){
		return this.qs.callback !== undefined;
	};

	/**
	* @method send
	* @public
	* @param {Object} options
	* @returns {Object} this to chain
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
	* @returns {Object} this to chain
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
* @module Connection
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
* @returns {String} return current uuid
*/
Connection.prototype.id = function(){
	return 'n' + this._index;
};

/**
* @method newId
* @public
* @returns {String} Increment the index and return a new id
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
* @returns {String} path of callback
*/
Connection.prototype.getCallbackPath = function(){
	return [this.name, 'requests', this.id(), 'callback'].join('.');
};
/**
* @method request
* @public
* @returns {Object}
*/
Connection.prototype.request = require('../request/request').request;
/**
* @method get
* @public
* @returns {Object}
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
(function(){
	var copy = require('../utils/copy').copy;
	var Event = require('../domain/core').Event;
	/**
	* Responsible for make connections to tracker server
	*
	* @class Tracker
	* @constructor
	*/
	function Tracker(){
		/*
		* @property {Connection} connection instance
		* @public
		*/
		this.connection = {};
	}
	/*
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
	* @returns {Object} element
	*/
	DomElement.create = function(tagName, document){
		return document.createElement(tagName);
	};
	/**
	* @method create
	* @param {String} tagName
	* @param {Object} document
	* @public
	* @returns {Object} this - Chainable method
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
	* @returns {Object} this - Chainable method
	*/
	DomElement.prototype.setAttributes = function(attributes){
		var merge = require('../utils/merge').merge;
		merge(this.element, attributes);
	};
	
	/**
	* @method append
	* @param {Object} child
	* @public
	* @returns {Object} this - Chainable method
	*/
	DomElement.prototype.append = function(child){
		this.element.appendChild(child);
		return this;
	};
	/**
	* @method findParentTag
	* @param {String} tag UPPERCASE tag name
	* @public
	* @returns {Object} parentElement
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
	* @returns {Object} return this to allow chainability
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
	* @extends Ad
	* @extends DomElement
	*/
	var AdDom = function(){
		// extends Ad
		Ad.apply(this, arguments);
		
		/**
		* Instance of tracker
		* @property tracker
		* @type tracker
		* @public
		*/
		this.tracker = {};
	};
	// extends DomElement
	AdDom.prototype = new DomElement();
	
	
	/**
	* @method getSpaceId
	* @returns {String} return the id of the first parent div
	*/
	AdDom.prototype.getSpaceId = function(){
		var node = this.findParentTag('DIV');
		return node.id;
	};
	
	/**
	* @method getClickTag
	* @param {Object} config
	* @returns {String} the full url to track this link
	* @example http://tracker.adlayerapp.com/click/10?&campaign_id=1235&link=http://www.adlayer.com.br
	*/
	AdDom.prototype.getClickTag = function(config){
		// Tracker url
		var trackerUrl = this.tracker.connection.getUrl();

		var event = new Event({
			ad_id: this.id,
			type: 'click',
			campaign_id: this.campaign_id,
			space_id: this.getSpaceId(),
			site_id: config.site_id,
			page_id: config.page_id,
			page_url: config.page_url,
			link: this.link
		});

		if( event.validate() && this.link ){
			var url = [trackerUrl, 'click', this.id].join('/');
			url = url + '?' + event.toQuery();
			return url;
		}
		return false;
	};
	
	/**
	* @method init
	* @param {Object} space
	* @param {Object} config
	*/
	AdDom.prototype.init = function(space, config){
		var ad = this;
		
		/**
		{
			type: 'impression',
			
			site_id: config.site_id,
			domain: config.domain,
			page_url: config.page_url,
			page_id: config.page_id,
			
			ad_id: ad.id,
			campaign_id: ad.campaign_id,
			space_id: space.id
		}
		**/
		config.ad_id = ad.id;
		
		config.space_id = space.id;
		config.space_id || delete config.space_id;
		
		config.campaign_id = ad.campaign_id;
		
		// Listener for 'LOAD' event
		ad.on('load', function(){

			config.type = 'impression';
			ad.tracker.track(config);
			
		});

		// Listener for 'PLACEMENT' event
		ad.on('placement', function(){
			// Setting click tag in ad element
			var clickTag = ad.getClickTag(config);
			ad.element.href = clickTag;
		});
		return ad;
	};
	
	exports.AdDom = AdDom;
	
	
	
})();
(function(){
	
	// modules
	var DomElement = require('./dom_element').DomElement;
	var Space = require('../domain/space').Space;

	/**
	* Space dom
	*
	* @class SpaceDom
	* @extends DomElement
	* @requires Ad
	*/
	var SpaceDom = function(){
		// extends Space
		Space.apply(this, arguments);
		
		this.placements = {};
		// Current ad
		this.ad = {};
	};
	// extends DomElement
	SpaceDom.prototype = new DomElement();
	
	/**
	* @method placeAd
	* @param {Object} DomElement Ad to append in element
	* @returns {Object} return this to chain methods
	*/
	SpaceDom.prototype.placeAd = function(ad){
		this.element.appendChild(ad.element);
		ad.emit('placement');
		this.ad = ad;
		return this;
	};
	
	/**
	* @method getElement
	* @returns {Object} return the DomElement
	*/
	SpaceDom.prototype.getElement = function(){
		return this.document.getElementById(this.id);
	};
	
	exports.SpaceDom = SpaceDom;
})();

/**
* @module ads
*/
/**
* @class Swf
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
		if(!this.preloader){
			return this.src;
		}
		
		var url = this.preloader + '?' + queryString.stringify({
			src: this.src, 
			callback: this.callback, 
			value: this.id
		});
		
		return url;
	};
};
exports.Swf = Swf;
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
	* @extends Swf
	*/
	var EmbedAd = function(){
		AdDom.apply(this, arguments);
		Swf.apply(this, arguments);
		
		var __construct = (function(self){
			self.create('EMBED');
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
	* @extends Swf
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
* @class ImgAd
* @extends AdDom
*/
(function(){
	var AdDom = require('../dom/ad_dom').AdDom;
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
				self.append(img);
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
(function(){
	var Embed = require('./embed_ad.js').EmbedAd;
	var ObjectAd = require('./object_ad.js').ObjectAd;
	var FlashAd = function(data){
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
* @module ads
*/
(function(){
	
	exports.ads = (function(){
		var FlashAd = require('./flash_ad.js').EmbedAd;
		var Img = require('./img_ad.js').ImgAd;
		
		return {
			create: function(data){
				// mixin
				data.id = data._id;
				data.src = data.file;
				delete data.file;
				delete data._id;
				
				switch(data.type){
					case 'flash':
						data.preloader = 'http://xframe.adlayerjavascriptsdk.com.s3.amazonaws.com/as3.swf';
						data.callback = 'adlayer.markAdAsLoaded';
						return new FlashAd(data);
					case 'image':
						return new Img(data);
				}
			}
		};
	})();
	
})();
(function(){
	
	// modules
	var SpaceDom = require('../dom/space_dom').SpaceDom;
	var ads = require('../ads/ads').ads;

	/**
	* Basic Space
	*
	* @class BasicSpace
	* @extends DomElement
	*/
	var BasicSpace = function(){
		// extends Space
		SpaceDom.apply(this, arguments);
		
		this.placements = {};
		// Current ad
		this.ad = {};
	};
	// extends DomElement
	BasicSpace.prototype = new SpaceDom();

	BasicSpace.prototype.init = function(tracker, config){
		if(this.ads && this.ads.length > 0){
			var ad = ads.create(this.getAd());
			ad.tracker = tracker;
			ad = ad.init(this, config);

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
	* @extends SpaceDom
	* @implements ISpace
	*/
	var ExpandableSpace = function(){
		BasicSpace.apply(this, arguments);
		
		this.expandEvent = 'mouseover';
		this.retreatEvent = 'mouseout';
		
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
	* @extends SpaceDom
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
	* @extends SpaceDom
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
* @module spaces
*/
(function(){	
	exports.spaces = (function(){
		var Expandable = require('./expandable_space.js').ExpandableSpace,
			Floater = require('./floater_space.js').FloaterSpace,
			Static = require('./static_space.js').StaticSpace;
		
		return {
			create: function(data){
				data.id = data._id;
				data.width = data.size.width;
				data.height = data.size.height;
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
exports.config = {
	url: {
		adserver: {
			host: 'jocasta.adlayerapp.com'
		},
		tracker: {
			host: 'tracker.adlayerapp.com'
		}
	},
	adsPerSpace: 1,
	page: {
		autoRun: true,
		scriptTagId: 'adlayerScript'
	}
};
(function(){
	/**
	* @class Adserver
	* @constructor
	*/
	var Adserver = function(connection){
		this.connection = connection;
	};
	/*
	* Main method to make http requests
	* @method request
	* @param {String} path path to request in server
	* @param {Object} query query string to request
	* @param {Function} callback
	* @public
	*/
	Adserver.prototype.request = function(path, query, callback){
		var sign = this.connection.id();
		var opts = copy(this.connection);
		opts.host = opts.host;
		opts.path = path;
		opts.qs = query || {};
		opts.qs.callback = 'adlayer.connections.' + opts.name + '.requests.' + sign + '.callback';
		var req = request().get(opts, callback);
		this.connection.requests[sign] = req;
	};
	/*
	* Access to 'pages' endpoint
	* @method pages
	* @param {String} id
	* @param {Object} query query string to request
	* @param {Function} callback
	* @public
	*/
	Adserver.prototype.pages = function(id, query, callback){
		this.request('/pages/' + id, query, callback);
	};
	/*
	* Access to 'ads' endpoint
	* @method pages
	* @param {String} id
	* @param {Object} query query string to request
	* @param {Function} callback
	* @public
	*/
	Adserver.prototype.ads = function(id, query, callback){
		this.request('/ads/' + id, query, callback);
	};
	exports.Adserver = Adserver;
})();
/**
* @module PageApi
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
	* @extends Ad
	* @extends EventEmitter
	*/			
	var AdApi = function(){
		AdDom.apply(this, arguments);
		
		this.document;
		this.tracker;
		this.adserver;
	};
	
	/**
	* @method getData
	* @param {Function} callback
	*/
	AdApi.prototype.getData = function(callback){
		this.adserver.ads(this.id, null, callback);
	};
	
	
	/**
	* @method init
	* @public 
	*/
	AdApi.prototype.init = function(tracker, callback){
		var self = this;
		// Get all page data
		this.getData(function(err, data){
			if(!err && data){
				var ad = ads.create(data);
				ad.tracker = tracker;
				ad.init({id: undefined}, {});
				ad.emit('placement');
				self.element = ad.element;

				callback.call(self);
			}
		});
		return this;
		
	};
	
	exports.AdApi = AdApi;
})();
(function(window){
	
/**
* Api wrapper
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
(function(window){
	
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
	* @private
	*/
	(function initialization(){
		var api = window.adlayer;
		var AdApi = api.lib.AdApi;
		var contentloaded = require('../lib/src/utils/contentloaded').contentloaded;
		
		contentloaded(global, function(){
			var document = global.document;
			var placeholders = getElementsByClass('adlayer_ad_placeholder', document);
			
			for(var i = 0; i < placeholders.length; i++){
				var placeholder = placeholders[i];
				var id = placeholder.id;
				var el = document.getElementById(id);
				var ad = new AdApi({
					id: id,
					adserver: api.adserver,
					document: document
				});

				ad.init(api.tracker, function(){
					var parent = el.parentNode;
					parent.replaceChild(this.element, el);
					api.ads[id] = this;
				});
			}
		});
	})();
	
})(this);
})(this);