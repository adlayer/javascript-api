/**
* All configuration for adlayer api
*
* @module api
* @submodule config
*/
exports.config = {
	/**
	* Adserver and tracker connection options
	*
	* @attribute url
	*/	
	url: {
		adserver: {
			host: 'jocasta.adlayerapp.com'
		},
		tracker: {
			host: 'tracker.adlayerapp.com'
		}
	},
	/**
	* Number of ads per spaces download for every request
	*
	* @attribute adsPerSpace
	*/
	adsPerSpace: 1,
	/**
	* Page specfic configurations
	*
	* @attribute page
	*/
	page: {
		scriptTagId: 'adlayerScript'
	}
};