const path = require('path');

module.exports = {
  entry: './src/travel-sorter.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'TravelSorter',
    libraryTarget: 'commonjs-module'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
       {
         test: /\.json$/,
         use: {
           loader: 'json-loader'
         }
       }
    ]
  }
}
