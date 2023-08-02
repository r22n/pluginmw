const { VueLoaderPlugin } = require('vue-loader');
const LicensePlugin = require('webpack-license-plugin');
const { DefinePlugin } = require('webpack');
const self = require('./package.json');

module.exports = {
    entry: './src/index.ts',
    mode: 'production',
    output: {
        path: `${__dirname}/dist`,
        filename: `${self.plugin}.js`,
    },
    resolve: {
        extensions: [".vue", ".js", ".ts"],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                },
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    "vue-style-loader",
                    'style-loader',
                    'css-loader',
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new LicensePlugin(),
        new DefinePlugin({
            d_name: JSON.stringify(self.plugin),
        }),
    ],
}
