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

		contentloaded(global, function(){
			var document = global.document;
			var spaces = getElementsByClass('adlayer_space_global', document);
			
			for(var i = 0; i < spaces.length; i++){
				var element = spaces[i];
				
				var space = new SpaceApi({
					id:element.id,
					adserver: api.adserver,
					tracker: api.tracker,
					document: document,
					adsPerSpace: config.adsPerSpace
				});
				
				// notify the parent api using callback
				space.init(function(){
					api.spaces[element.id] = this;
					api.ads[this.ad.id] = this.ad;
				});
			}
			
		});
		
	})();
	
})(this);