var join = require("path").join;
var HtmlWebpackPlugin = require("html-webpack-plugin");

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: "./src/main.ts",
    output:{
        path: join(__dirname, "./dist"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            { test: /\.html$/, use: "html-loader"},
            { test: /\.ts$/, use: "ts-loader"},
            { test: /\.css$/, use: ExtractTextPlugin.extract("css-loader")},
            {
            test: /\.(png|jp(e*)g|svg|woff)$/,  
            use: [{
                loader: 'file-loader'
            }]
        }
        ]
    },
    plugins: [
    new ExtractTextPlugin("styles.css"),
        new HtmlWebpackPlugin({
            template: "./index.html"
        })
    ]

}