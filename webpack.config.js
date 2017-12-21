//webpack --display-reasons
//Remove jquery https://github.com/webpack/webpack/issues/1275
var webpack = require('webpack');
//var cors = require('cors');
var pkg = require('./package.json');
var env = process.env.WEBPACK_ENV;
var name = 'grapes';
var plugins = [];

if(env !== 'dev'){
  plugins = [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      minimize: false,
      compressor: {warnings: false},
    }),
    new webpack.BannerPlugin(pkg.name + ' - ' + pkg.version),
    //v2 new webpack.BannerPlugin({banner: 'Banner v2'});
  ]
} else {
  plugins = [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      minimize: false,
      compressor: {warnings: false},
    }),
    new webpack.BannerPlugin(pkg.name + ' - ' + pkg.version),
    //v2 new webpack.BannerPlugin({banner: 'Banner v2'});
  ]
}

plugins.push(new webpack.ProvidePlugin({_: 'underscore'}));

module.exports = {
  entry: './src',
  devServer: { 
	headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Credentials": "true" }
  },
  output: {
      filename: './dist/' + name + '.min.js',
      library: 'grapesjs',
      libraryTarget: 'umd',
  },
  externals: {jquery: 'jQuery'},
  plugins: plugins,
  module: {
    loaders: [{
        test: /\.js$/,
        loader: 'babel-loader',
        include: /src/,
        exclude: /node_modules/,
        query: {presets: ['es2015']}
    }],
  },
  resolve: {
    modules: ['src', 'node_modules'],
  },
}
