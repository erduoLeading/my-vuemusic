const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const {getRecommendData} = require('./recommend/getRecommendData')
const {getRecommendDetailData} = require('./recommendDetail/setDetailData')
const {getSingerData} = require('./singer/getSingerData')
const {getSingerDetail} = require('./singerDetail/getSingerDetail')
const {getSongDetail} = require('./songDetail/getSongDetail')
const {getLyric} = require('./lyric/getLyric')
const {getRankData} = require('./rank/getRankData')
const {getRankDetailData} = require('./rankDetail/getRankDetailData')
const {getHotKey} = require('./hotKey/getHotKey')
const {getSearchResult} = require('./search/getSearchData')
app.use(bodyParser.urlencoded({extended:false}));//使用中间件
mongoose.connect('mongodb://127.0.0.1:27017/erduomusic',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>console.log("数据库连接成功"))
    .catch(err=>{
        console.log("数据库连接失败:",err)
    })

app.all("*", function (req, res, next) { //解决跨域请求问题
    res.header({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': req.headers.origin || '*',
        'Access-Control-Allow-Headers': 'X-Requested-With',
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
        'Content-Type': 'application/json; charset=utf-8'
    });
    if (req.method === "OPTIONS") {
        res.send(200)
        // eslint-disable-next-line no-console
        console.log("has option")
    } else {
        next()
    }
});

app.get('/api/recommenddata',getRecommendData)
app.get("/api/recommendDetail/:id",getRecommendDetailData)
app.get('/api/singerdata',getSingerData)
app.post('/api/singerDetail',getSingerDetail)
app.post('/api/songDetail',getSongDetail)
app.post('/api/lyric',getLyric)
app.get('/api/rankdata',getRankData)
app.get('/api/rankDetail/:id',getRankDetailData)
app.get('/api/hotKey',getHotKey)
app.get('/api/searchResult/:id',getSearchResult)
app.listen(9527,()=>{
    // eslint-disable-next-line no-console
    console.log("监听端口9527成功")
})
