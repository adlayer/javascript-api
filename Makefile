default: npm install .
	
deploy: s3cmd put --acl-public dist/api.js dist/api.min.js dist/page.js dist/page.min.js dist/ads.js dist/ads.min.js s3://api.adlayerjavascriptsdk.com

.PHONY: default deply