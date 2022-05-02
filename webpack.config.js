const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');
let ip = '0.0.0.0';

//const execSync = require('child_process').execSync;
//ip = execSync('curl ifconfig.me');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
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
  plugins: [
    new ReplaceInFileWebpackPlugin([{
      dir: 'dist/',
      test: /\.js$/,
      rules: [{
        search: /yourdomain/ig,
        replace: `${ip}:8090`
      }]
    }])
  ]
};
