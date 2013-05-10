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
		var contentloaded = require('../lib/src/utils/contentloaded').contentloaded;
		
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

				ad.init(api.tracker, function(){
					api.ads[this.id] = this;
					parent.replaceChild(this.element, document.getElementById(this.id));
				});
			}
		});
	})();
	
})(this);