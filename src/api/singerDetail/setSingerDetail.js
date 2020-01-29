const request = require('request')
const fs = require('fs')
const mongoose = require('mongoose')
const {JSDOM} = require('jsdom')
// const {singerDetailTable} = require('./singerDetailTable')
// mongoose.connect('mongodb://127.0.0.1:27017/erduomusic',{
//     useNewUrlParser:true,
//     useFindAndModify:true
// }).then(()=>{
//     console.log("数据库连接成功")
// }).catch(err=>{
//     console.log("数据库连接失败err:",err)
// })
request({
    method: 'GET',
    url: 'https://i.y.qq.com/n2/m/share/details/singer.html',
    qs: {
        singermid:'004V53Ga0bV65j',
        ADTAG:'myqq',
        from:'myqq',
        channel:10007100,
    },
}, (err, res, body) => {
    if (err) throw err
    let dom = new JSDOM(body,{runScripts:"dangerously"});
    let firstPageData= dom.window.firstPageData;
    // eslint-disable-next-line no-console
    fs.exists('./demo.json', ifExist => {
        if (!ifExist) {
            fs.writeFile('./demo.json', JSON.stringify(firstPageData), {
                encoding: 'utf8'
            }, err => {
                if (err) throw err
            })
        }
    })
    //创建数据表
    //todo
})
