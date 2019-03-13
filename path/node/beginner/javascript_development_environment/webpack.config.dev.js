 import path from 'path';

 export default {
   debug: true,
   devtools: 'inline-source-map',
   inInfo: false,
   entry: [
     path.resolve(__dirname, 'src/index')
   ],
   terget: 'web',
   output: {
     path: path.resolve(__dirname, 'src'),
     publicPath: '/',
     filename: 'bundle.js'
   },
   plugins: [],
   module: {
     loaders: [
       {test: /\.js$/, exculde: /node_modules/, loaders: ['babel']},
       {test: /\.css$/, loaders: ['style', 'css']}
     ]
   }
 }
