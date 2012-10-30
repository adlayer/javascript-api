var smoosh = require('smoosh');
var fs = require('fs');
var exec = require('child_process').exec;
var path = require('path');

var modules = {};

var head = ["./template/head.js"];

var utils = [
	"./lib/src/module.js",
	"./lib/src/utils/copy.js",
	"./lib/src/utils/merge.js",
	"./lib/src/utils/loadscript.js",
	"./lib/src/node_modules/events.js",
	"./lib/src/node_modules/querystring.js"
];

var domain = [
	"./lib/src/domain/core.js",
	"./lib/src/domain/event.js", 
	"./lib/src/domain/ad.js",
	"./lib/src/domain/space.js",
	"./lib/src/domain/page.js",
	"./lib/src/domain/site.js"
];

var request = [
	"./lib/src/request/http.js", 
	"./lib/src/request/http_request.js",
	"./lib/src/request/img_request.js",
	"./lib/src/request/jsonp_request.js",
	"./lib/src/request/request.js"
];

var connection = [
	"./lib/src/connection/connection.js"
];

var tracker = ["./lib/src/tracker/tracker.js"];

var dom = [
	"./lib/src/dom/dom_element.js", 
	"./lib/src/dom/ad_dom.js",
	"./lib/src/dom/space_dom.js"
];

var ads = [
	"./lib/src/ads/swf.js",
	"./lib/src/ads/embed_ad.js",
	"./lib/src/ads/object_ad.js",
	"./lib/src/ads/img_ad.js",
	"./lib/src/ads/flash_ad.js",
	"./lib/src/ads/ads.js"
];

var spaces = [
	"./lib/src/spaces/basic_space.js",
	"./lib/src/spaces/expandable_space.js",
	"./lib/src/spaces/floater_space.js",
	"./lib/src/spaces/static_space.js",
	"./lib/src/spaces/spaces.js"
];


var config = [
	"./lib/src/config/config.js"
];

var api = [
	"./lib/src/api/page.js",
	"./lib/src/api/api.js"
];

var footer = ["./template/footer.js"];

modules.api = [].concat(head, utils, domain, request, connection, tracker, dom, ads, spaces, config, api, footer);

var config = {
	"VERSION": "1.0.0",
	"JSHINT_OPTS": { 
		"boss": true,
		"forin": true,
		"browser": true
	},
	"JAVASCRIPT": modules
}

desc('run default tasks');
task('default', function(){
	smoosh.make(config);
});