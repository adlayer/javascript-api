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