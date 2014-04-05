/**
* @module widgets
*/
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
		var SpaceApi = api.lib.SpaceApi;
		var contentloaded = require('../lib/src/utils/contentloaded').contentloaded;
		var config = api.config;
		var events = {};
		
		if(api.plugins){
			for(var pluginName in api.plugins){
				var plugin = api.plugins[pluginName];
				if(plugin.widget === 'spaces' || plugin.widget === 'spaces'){
					for(var event in plugin.events){
						var result = events[event] || [];
						result.push(plugin.events[event]);
						events[event] = result;
					}
				}
			}
		}		

		contentloaded(global, function(){
			var document = global.document;
			var spaces = getElementsByClass('adlayer_space_global', document);
			
			for(var i = 0; i < spaces.length; i++){
				
				var element = spaces[i];
				
				var space = new SpaceApi({
					id: element.id,
					adserver: api.adserver,
					tracker: api.tracker,
					document: document,
					adsPerSpace: config.adsPerSpace
				});
			
				// notify the parent api using callback
				(function(space, api){
					space.init(function(){
						api.spaces[this.id] = this;
						api.ads[this.ad.id] = this.ad;
						if(events.placement){
							for(var i = 0; i < events.placement.length; i++){
								var fn = events.placement[i];
								fn(api.spaces[this.id]);
							}
						}
					});
				})(space, api);
			}
			
		});
		
	})();
	
})(this);