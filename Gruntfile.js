var path = require('path');
var head = ["./template/head.js"];

var utils = [
	"./lib/src/module.js",
	"./lib/src/utils/copy.js",
	"./lib/src/utils/merge.js",
	"./lib/src/utils/loadscript.js",
	"./lib/src/node_modules/events.js",
	"./lib/src/node_modules/querystring.js",
	"./lib/src/utils/contentloaded.js"
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
	"./lib/src/ads/html_ad.js",
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
	"./api/config.js"
];

var api = [
	"./api/tracker.js",
	"./api/adserver.js",
	"./api/adlayer.js",
	"./api/api.js"
];

var pageApi = [
	"./api/tracker.js",
	"./api/adserver.js",
	"./api/adlayer.js",
	"./api/page_api.js",
	"./api/api.js",
	"./api/page_api.js",
	"./api/page_autorun.js"
];

var adsApi = [
	"./api/tracker.js",
	"./api/adserver.js",
	"./api/adlayer.js",
	"./api/api.js",
	"./api/ad_api.js",
	"./api/ad_autorun.js"
];

var spacesApi = [
	"./api/tracker.js",
	"./api/adserver.js",
	"./api/adlayer.js",
	"./api/api.js",
	"./api/spaces_api.js",
	"./api/spaces_autorun.js"
];

var footer = ["./template/footer.js"];



module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {},
			// Modules to concat
			api: {
				src: [head, utils, domain, request, connection, dom, ads, spaces, config, api, footer],
				dest: 'dist/api.js'
			},
			ads:{
				src: [head, utils, domain, request, connection, dom, ads, spaces, config, adsApi, footer],
				dest: 'dist/ads.js'
			},
			spaces: {
				src: [head, utils, domain, request, connection, dom, ads, spaces, config, spacesApi, footer],
				dest: 'dist/spaces.js'
			},
			page: {
				src: [head, utils, domain, request, connection, dom, ads, spaces, config, pageApi, footer],
				dest: 'dist/page.js'
			}
		},
		uglify: {
			dist: {
				options: {
					sourceMap: function(dest){
						return dest + '.map';
					},
					sourceMapPrefix: 1,
					sourceMappingURL: function(map){
						return path.basename(map) + '.map';
					}
				},
				files: {
					'dist/api.min.js': ['dist/api.js'],
					'dist/ads.min.js': ['dist/ads.js'],
					'dist/spaces.min.js': ['dist/spaces.js'],
					'dist/page.min.js': ['dist/page.js']
				}
			}
		},
		yuidoc: {
		    compile: {
		      name: '<%= pkg.name %>',
		      description: '<%= pkg.description %>',
		      version: '<%= pkg.version %>',
		      url: '<%= pkg.homepage %>',
		  	  logo: 'http://adlayer.com.br/img/logo.png',
		      options: {
		        paths: ['api', 'lib/src'],
		        outdir: 'docs/api'
		      }
		    }
		  }
	});
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-yuidoc');
	
	grunt.registerTask('default', ['concat', 'uglify']);
	grunt.registerTask('docs', ['yuidoc']);
}