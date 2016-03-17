var webpack = require("webpack");

module.exports = {
    entry: "./src/js/app.tsx",
    output: {
        path: __dirname + "/dist/",
        filename: "app.js"
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
            { test: /\.(woff|woff2)$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf$/, loader: "file-loader" },
            { test: /\.eot$/, loader: "file-loader" },
            { test: /\.svg$/, loader: "file-loader" }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};