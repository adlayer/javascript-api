/**
* @modules widgets
*/
(function(window){
	/**
	* @method initialization
	* @private
	*/
	(function initialization(){
		var api = window.adlayer;
		var queryString = api.lib.querystring;
		var Page = api.lib.PageApi;
		var document = global.document;
		var config = api.config;
		var contentloaded = require('../lib/src/utils/contentloaded').contentloaded;

		if(document) {
		
			var scriptTag = document.getElementById(config.page.scriptTagId);
			var queries = scriptTag.src.split('?')[1];
			var params = queryString.parse(queries);

			config.site_id = config.site_id || params.site;
			config.domain = config.domain || global.location.hostname;
			config.page_id = config.page_id || params.page;
			config.page_url = config.page_url || global.location.href;

			var page = new Page({
				tracker: api.tracker,
				id: config.page_id,
				url: config.page_url,
				site_id: config.site_id,
				domain: config.domain,
				adserver: api.adserver,
				document: document,
				adsPerSpace: config.adsPerSpace
			});
			
			contentloaded(global, function(){
				api.page = page.init();
				api.spaces = page.spacesCollection;
				api.ads = page.adsCollection;
			});
		}
	})();
})(this);