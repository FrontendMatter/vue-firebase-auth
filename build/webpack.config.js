var path = require('path')
var WebpackConfig = require('themekit-webpack-config')
var config = new WebpackConfig()
	.withStandaloneEntry('vue-firebase-auth')
	.withLibrary('VueFirebaseAuth')
	.withAlias({
		'vue-firebase-auth': path.resolve(__dirname, '..')
	})
	.use('extract')

module.exports = config