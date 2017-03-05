'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');// need to be installed locally npm i webpack

const DEV = NODE_ENV === 'development';
const PROD = !DEV;

module.exports = {

	//custom entry/output
	entry: {
		home: './app/js/spa',
		game: './app/app',
		chat: './app/js/chat',
	}, //base js file path
	output: {
		path: './build/',
		filename: '[name].js',
		library: '[name]',
	},

	watch: false,//DEV// watch for changes

	watchOptions: {
		aggregateTimeout: 100 //wait after changes //300 default
	},

	devtool: 'source-map',
	//devtool: 'eval',

	//devtool: DEV ? 'source-map' : null,

	plugins: [
		//new webpack.DefinePlugin({DEV: JSON.stringify(DEV)}), //shit
		// new webpack.optimize.UglifyJsPlugin({
		// 	compress: {
		// 		//drop_console: true,
		// 		dead_code: true,
		// 		join_vars: true,
		// 		warnings: false
		// 	}
		// })
	],

	resolveLoader: {
		modules: ["node_modules"],
		moduleExtensions: ['-loader'],
		extensions: ["*", ".js"]
	},

	module: {
		loaders: [{
			test: /\.js$/, //regex?
			exclude: /node_modules/,
			//loader: 'babel-loader',
			loader: 'babel-loader',//?presets[]=es2015
			query:{
				presets: ['es2015']
			}
		},{
			test: /\.css$/,
			loader: 'css-loader'
		}, {
			test: /\.less$/,
			use: [
				'style-loader',
				{loader: 'css-loader'},
				{loader: 'less-loader'}
			]
		}


		]
	},

	//server ?
	devServer: {
		host: 'localhost', //default
		port: 8080 //default
	}

};
