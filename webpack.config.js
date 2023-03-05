const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/Components/Main.ts',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.[contenthash].js',
	},
	optimization: {
		minimizer: [new TerserPlugin({ extractComments: false })],
	},
	resolve: {
		alias: {
			General: path.resolve(__dirname, 'public'),
		},
		extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				loader: 'ts-loader',
			},
			{
				test: /\.(jpg|png|svg|gif|ico|icns|woff2)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
				}
			},
			{
				test: /\.mp4$/,
				loader: "file-loader",
				options: {
					name: "[path][name].[ext]",
					outputPath: "video"
				}
			},
			{
				test: /\.(scss|css)$/,
				use: [
					'style-loader',
					{
						loader: "css-loader",
						options: {
							url: false,
						},
					},
					'sass-loader'
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({ 
			template: path.resolve(__dirname, 'src', 'index.html')
		}),
		// new CopyWebpackPlugin({
		// 	patterns: [
		// 		{ from: 'public/assets', to: 'assets' },
		// 		{ from: 'public/fonts', to: 'fonts' },
		// 	]
		// })
	],
};
