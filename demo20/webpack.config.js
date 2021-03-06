let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');


module.exports = {
    mode: 'development',
    optimization: {
		splitChunks: { // 分割代码块
			cacheGroups: { // 缓存组
				common: { // 公共的模块
					chunks:'initial',
					minSize:0,
					minChunks:2
                },
                vendor: {
                    priority: 1,
                    test: /node_modules/,
                    chunks:'initial',
					minSize:0,
					minChunks:2
                }
			}
		}
	},
    entry: {
        index: './src/index.js',
        other: './src/other.js'
    },
    output: {
        filename: '[name].js', 
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new webpack.IgnorePlugin(/^\.\/locale/, /moment$/)
    ],
    module: {
        noParse: /jquery/, // 不去解析 jquery 的依赖库
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            }
        ]
    } 
}