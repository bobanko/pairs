'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');// need to be installed locally npm i webpack

const DEV = NODE_ENV === 'development';

module.exports = {
	entry: './app/app', //base js file path
	output: {
		filename: 'dist/build.js', //dest name
		library: 'pairsLib' //all exports will be available through this name
	},
	//watch: true, // watch for changes

	watch: false,//DEV

	watchOptions: {
		aggregateTimeout: 100 //wait after changes //300 default
	},

	//devtool: 'source-map',
	//devtool: 'eval',


	devtool: DEV ? 'source-map' : null,

	plugins: [
		new webpack.DefinePlugin({DEV: JSON.stringify(DEV)}), //shit
	],

	module: {
		loaders: [{
			test: /\.js$/, //regex?
			loader: 'babel-loader'
		}]
	}

};
