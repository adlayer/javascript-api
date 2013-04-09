/**
* @module api
*/
(function(){
	/**
	* High level API to handle with Adlayer Adserver
	*
	* @class Adserver
	* @constructor
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
	*/
	Adserver.prototype.spaces = function(id, query, callback){
		this.request('/spaces/' + id, query, callback);
	};
	
	exports.Adserver = Adserver;
})();