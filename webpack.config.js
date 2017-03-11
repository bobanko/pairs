'use strict';

const webpack = require('webpack');// need to be installed locally npm i webpack
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractLESS = new ExtractTextPlugin('[name].css');

module.exports = {

	//custom entry/output
	entry: {
		home: './app/js/spa',
		game: './app/app',
		chat: './app/js/chat',
	}, //base js file path
	output: {
		path: './build/',
		publicPath: './build/',
		filename: '[name].js',
		library: '[name]',
	},

	watch: true,

	watchOptions: {
		aggregateTimeout: 100 //wait after changes //300 default
	},

	devtool: 'source-map',

	resolveLoader: {
		modules: ["node_modules"],
		moduleExtensions: ['-loader'],
		extensions: ["*", ".js"]
	},

	module: {
		rules: [
			// {
			// 	test: /\.less$/i,
			// 	use: extractLESS.extract(['css-loader', 'less-loader'])
			// },
			{
				test: /\.less$/,
				use: [{
					loader: "style-loader"
				}, {
					loader: "css-loader", options: {
						sourceMap: true
					}
				}, {
					loader: "less-loader", options: {
						sourceMap: true
					}
				}]
			},
			{
				test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 12000,
						}
					}
				]
			}
		],

	},

	plugins: [
		//extractLESS
	],

	devServer: {
		host: 'localhost', //default
		port: 8080 //default
	}

};
