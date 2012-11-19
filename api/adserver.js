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