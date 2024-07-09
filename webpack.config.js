const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: './src/js/main.js',
    },
    resolve: {
        fallback: {
            util: require.resolve('util/'),
        }
    },
    mode: "development",
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: './',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(woff(2)?|ttf|eot)$/,
                type: "asset/resource",
                generator: {
                    filename: './fonts/[name][ext]',
                    outputPath: './css/'
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['main', 'index'],
        }),
        new HtmlWebpackPlugin({
            template: 'src/konfiguration.html',
            filename: 'konfiguration.html',
            chunks: ['main', 'common'],
        }),
        new HtmlWebpackPlugin({
            template: 'src/muster.html',
            filename: 'muster.html',
            chunks: ['main', 'common'],
        }),
        new HtmlWebpackPlugin({
            template: 'src/color.html',
            filename: 'color.html',
            chunks: ['main', 'common'],
        }),
        new HtmlWebpackPlugin({
            template: 'src/stuff.html',
            filename: 'stuff.html',
            chunks: ['main', 'common'],
        }),
        new HtmlWebpackPlugin({
            template: 'src/404.html',
            filename: '404.html',
            chunks: ['main', 'common'],
        }),
        new HtmlWebpackPlugin({
            template: 'src/sucess.html',
            filename: 'sucess.html',
            chunks: ['main', 'common'],
        }),
        new HtmlWebpackPlugin({
            template: 'src/impressum.html',
            filename: 'impressum.html',
            chunks: ['main', 'common'],
        }),
        new HtmlWebpackPlugin({
            template: 'src/datenschutz.html',
            filename: 'datenschutz.html',
            chunks: ['main', 'common'],
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].bundle.css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'image', to: 'image' },
            ]
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 8080,
        historyApiFallback: {
            rewrites: [
                { from: /^\/$/, to: '/html/index.html' },
            ],
        },
    }
};