(function(window){
	
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
			var placeholders = document.getElementsByClassName('adlayer_ad_placeholder');
			
			for(var i = 0; i < placeholders.length; i++){
				var placeholder = placeholders[i];
				var id = placeholder.id;
				var el = document.getElementById(id);
				var ad = new AdApi({
					id: id,
					connection: api.connections.adserver,
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