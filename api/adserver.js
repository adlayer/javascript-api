/**
* @module adserver
*/
(function(){
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
	var Adserver = function(connection){
		/**
		* The instace of connection to be used as adserver
		*
		* @property connection
		* @type Object
		*/
		this.connection = connection;
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