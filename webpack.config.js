//import
const path=require('path')
const HtmlPlugin=require('html-webpack-plugin')
const CopyPlugin=require('copy-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')

//export
module.exports={
    resolve:{
        extensions:['.js','.vue'],
        alias:{
            '~':path.resolve(__dirname,'src'),
            'assets':path.resolve(__dirname,'src/assets')
        }
    },
    //parcel index.html
    //파일을 읽어들이는 지점 설정
    entry:'./src/main.js',

    //결과물(번들)을 반환하는 설정
    output:{
       // path:path.resolve(__dirname,'dist'),//기본이 dist폴더
       // filename:'main.js',//기본이 위에 entry에 있는 파일 이름
        clean: true//전에 작성한 내용 삭제(같은 폴더에거만 다른폴더를 삭제안함)

    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                use:'vue-loader'
            },
            {
                test:/\.s?css$/,  //끝이 css인걸 찾는다
                use:[
                    'vue-style-loader',
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]

            },
            {
                test:/\.js$/,
                use:[
                    'babel-loader'
                ]
            },
            {
                test:/\.(png|jpe?g|gif|webp)$/,
                use:'file-loader'
            }
        ] 
    },

    //번들링후 결과물의 처리 방식 등 다양한 플러그인들을 설정
    plugins:[
        new HtmlPlugin({
            template:'./index.html'
        }),
        new CopyPlugin({
            patterns:[
                {from:'static'}//어디에서부터 복사할것이지
            ]
        }),
        new VueLoaderPlugin()
    ],
    devServer:{
        host:'localhost'
    }
}