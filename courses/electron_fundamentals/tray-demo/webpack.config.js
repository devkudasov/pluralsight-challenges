const path = require('path');

module.exports = {
    mode: 'development',
    target: 'electron-main',
    entry: { main: './src/main.ts' },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.jsx', '.json']
    }
}