'use strict';

const webpack = require('webpack');// need to be installed locally npm i webpack
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractLESS = new ExtractTextPlugin('[name].css');

module.exports = {

	//custom entry/output
	entry: {
		home: './app/js/spa',
		game: './app/app',
		chat: './app/js/chat',
	}, //base js file path
	output: {
		//path: '/dist/',
		//publicPath: './dist/',
		//library: '[name]',

		filename: 'dist/[name].bundle.js',
		//path: path.resolve(__dirname, 'dist')
	},

	// watch: true,
	//
	// watchOptions: {
	// 	aggregateTimeout: 100 //wait after changes //300 default
	// },


	module: {
		rules: [
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
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			title: 'Output Management',
			template: './app/index.html',
		})
	],

	devServer: {
		//host: 'localhost', //default
		//port: 8080, //default
		contentBase: './dist',
		hot: true,
	}

};
