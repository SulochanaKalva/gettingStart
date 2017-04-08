var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: {
    js: ['babel-polyfill', './src/index1.js']
  },
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    },{
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass?includePaths[]=/src/scss')

    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
    plugins: [
        new ExtractTextPlugin('./src/components/main.css',{
            allChunks: true
        })
    ]
};
