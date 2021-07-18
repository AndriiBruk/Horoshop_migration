const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require("terser-webpack-plugin"); 

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
    
    const config = {}
    if(isProd) {
        config.minimizer = [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin()
        ]

    }

    return config

}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './main.js',
    output: {
        filename: `main.[contenthash].js`,
        path: path.resolve(__dirname, 'app'),

    },
    optimization: optimization(),
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, 'app'),
        open: true,
        compress: true,
        port:3000

    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            inject: 'body',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename:'style.[contenthash].css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from: path.resolve(__dirname, 'src/img'), to: path.resolve(__dirname, 'app/img')}
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2)$/,
                loader:  'file-loader',                
                options: {                    
                    outputPath: 'fonts'
                }
            }
        ]
    }
}