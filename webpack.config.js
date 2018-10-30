var path = require("path");

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            { 
                test: /\.tsx?$/, 
                loader: "awesome-typescript-loader" 
            },           
            { 
                enforce: "pre", 
                test: /\.js$/, 
                loader: "source-map-loader" 
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 }
    }
};