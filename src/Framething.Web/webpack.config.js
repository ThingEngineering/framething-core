const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
    const mode = argv.mode === 'production' ? 'production' : 'development';
    return {
        mode: mode,
        entry: {
            framething: [
                './Static/JS/framething.js',
                './Static/CSS/framething.scss',
            ],
            data: [
                './Static/JS/generated_data.js',
            ],
        },
        output: {
            filename: mode === 'production' ? '[name].[chunkhash].js' : '[name].js',
            path: path.resolve(__dirname, 'wwwroot/dist'),
        },
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/,
                    use:
                        [
                            //'style-loader',
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    config: {
                                        ctx: {
                                            env: mode
                                        }
                                    }
                                }
                            },
                            'sass-loader'
                        ]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: mode === 'production' ? '[name].[contenthash].css' : '[name].css',
            }),
        ],
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
            },
        },
    };
};
