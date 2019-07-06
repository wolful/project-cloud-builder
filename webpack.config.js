const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
  mode: 'production',
  entry: './views/index.js',
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
	      exclude: /(node_modules|bower_component)/,
        use:{ 
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              ["transform-es2015-arrow-functions", { "spec": true }],
              ["@babel/proposal-class-properties"]
	    ]
          }
        }
      }
    ]
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
};
