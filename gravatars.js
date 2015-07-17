// https://nl.gravatar.com/site/implement/hash/
// https://nl.gravatar.com/site/implement/images/

var crypto = require('crypto');
var querystring = require('querystring');

var merge = function(options, def) {
	if( Object.prototype.toString.call(options) !== "[object Object]" ) { 
		options = {}; 
	}

	for( var k in def ) {
		if(!options[k]) {
			options[k] = def[k];
		}
	}

	return options;
};

var baseUrl = function(protocol) {
	return protocol === 'https' ? 'https://secure.gravatar.com' : 'http://www.gravatar.com';
};

var hashMD5 = function(data) {
	return crypto.createHash('md5').update(data).digest('hex');
};

var calcHash = function(email) {
	if( typeof email !== 'string' || email.indexOf('@') === -1 ) {
		throw new Error('Email must be of type string and must contain an @-sign');
	}

	email = email.replace(/\s/g, '').trim().toLowerCase();
	return hashMD5(email);
};

var gravatarImage = function(email, options) {
	options = merge(options, { 
		protocol: 'http',  // 'http' or 'https'
		extension: '.jpg', // '.jpg' or '',
		size: 80,
		defaultImage: '',
		forceDefault: false,
		rating: 'g'        // 'g', 'pg', 'r' or 'x'
	});

	var query = { r: options.rating, s: options.size };
	if( options.defaultImage ) query.d = options.defaultImage;
	if( options.forceDefault ) query.f = 'y';

	var url = baseUrl(options.protocol) + "/avatar/" + calcHash(email) + options.extension + "?" + querystring.stringify( query );

	return url;
};

module.exports = gravatarImage;
