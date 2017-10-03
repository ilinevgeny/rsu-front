global.Promise         = require('bluebird');

const mode = process.env.NODE_ENV.replace(/[^A-Z]/ig, '');

const webpack            = require('webpack');
const ExtractTextPlugin  = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const publicPath         = 'http://localhost:8050/public/assets';
const cssName            = mode === 'production' ? 'styles-[hash].css' : 'styles.css';
const jsName             = mode === 'production' ? 'bundle-[hash].js' : 'bundle.js';

const plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            BROWSER:  JSON.stringify(true),
            NODE_ENV: JSON.stringify(mode || 'development')
        }
    }),
    new ExtractTextPlugin(cssName),
    new webpack.LoaderOptionsPlugin({
        debug: true
    })
];

if (mode === 'production') {
    plugins.push(
        new CleanWebpackPlugin([ 'public/assets/' ], {
            root: __dirname,
            verbose: true,
            dry: false
        })
    );
    plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
}

module.exports = {
    entry: ['babel-polyfill', './src/client.js'],
    resolve: {
        modules: ['node_modules'],
        extensions: ['.json', '.js', '.jsx']
    },
    plugins,
    output: {
        path: `${__dirname}/public/assets/`,
        filename: jsName,
        publicPath
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader')
            },
            { test: /\.gif$/, loader: 'url-loader?limit=10000&mimetype=image/gif' },
            { test: /\.jpg$/, loader: 'url-loader?limit=10000&mimetype=image/jpg' },
            { test: /\.png$/, loader: 'url-loader?limit=10000&mimetype=image/png' },
            { test: /\.svg/, loader: 'url-loader?limit=26000&mimetype=image/svg+xml' },
            { test: /\.(woff|woff2|ttf|eot)/, loader: 'url-loader?limit=1' },
            { test: /\.jsx?$/, loader: 'babel-loader', exclude: [/node_modules/, /public/] },
            { test: /\.json$/, loader: 'json-loader' },
        ]
    },
    devtool: mode !== 'production' ? 'source-map' : false,
    devServer: {
        headers: { 'Access-Control-Allow-Origin': '*' }
    }
};
