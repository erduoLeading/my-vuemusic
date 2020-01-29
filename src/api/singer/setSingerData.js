const request = require('request')
const fs = require('fs')
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/erduomusic',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("数据库连接成功:")
}).catch(err=>{
    console.log("数据库连接失败:",err)
})
const {singerTable} = require('./singerTable')
request({
    method:'GET',
    url:'https://u.y.qq.com/cgi-bin/musicu.fcg',
    qs:{
        '-': 'getUCGI13777262007254665',
        g_tk: '5381',
        loginUin: '0',
        hostUin: '0',
        format: 'json',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq.json',
        needNewCode: 0,
        data: `{
            "comm": {"ct": 24, "cv": 0},
            "singerList": {
                "module": "Music.SingerListServer",
                "method": "get_singer_list",
                "param": {"area": -100, "sex": -100, "genre": -100, "index": -100, "sin": 80, "cur_page": 1}
            }
        }`,
}},(err,res,body)=>{
    if (err) {
        // eslint-disable-next-line no-console
        console.log("err:",err)
        return
    }
    fs.exists('./demo.json',ifExist =>{
        if (!ifExist) {
            fs.writeFile('./demo.json', body, {
                encoding: 'utf8'
            }, (err)=>{
                if (err) {
                    // eslint-disable-next-line no-console
                    console.log("err文件:",err)
                    return
                }

            })
        }
    })


    const  singerlist = JSON.parse(body).singerList.data.singerlist
    singerlist.forEach(item =>{
        singerTable.create({
            singer_id: item.singer_id,
            singer_mid: item.singer_mid,
            singer_name: item.singer_name,
            singer_pic: item.singer_pic
        }).then(res=>{
            // eslint-disable-next-line no-console
            console.log("歌手数据创建成功:", res)
        }).catch(err=>{
            // eslint-disable-next-line no-console
            console.log("歌手数据创建失败",err)
        })
    })
})
