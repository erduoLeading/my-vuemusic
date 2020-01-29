/*
    推荐表的数据库表格写入
 */
const request = require('request')
const fs = require('fs')
const path = require('path')
const {recommendTable,hotkeyTable} = require('./recommendTable')
const mongoose = require('mongoose')
//爬取数据到demo.json
mongoose.connect('mongodb://127.0.0.1:27017/erduomusic',{
    useNewUrlParser:true,
    useFindAndModify:true
}).then(()=>{
    console.log("数据库连接成功")
}).catch(err=>{
    console.log("数据库连接失败err:",err)
})

request({
    method: 'GET',
    url: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
    qs: {
        cgiKey: 'GetHomePage',
        _: 1577860123682,
        data: `{"comm":{"g_tk":833124585,"uin":869827329,"format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"h5","needNewCode":1},"MusicHallHomePage":{"module":"music.musicHall.MusicHallPlatform","method":"MobileWebHome","param":{"ShelfId":[101,102,161]}},"hotkey":{"module":"tencent_musicsoso_hotkey.HotkeyService","method":"GetHotkeyForQQMusicMobile","param":{"remoteplace":"txt.miniapp.wxada7aab80ba27074","searchid":"1559616839293"}}}`
    }}, async(err, res, body)=>{
    await recommendTable.deleteMany({}) //清空一次
    let v_shelf =  JSON.parse(body).MusicHallHomePage.data.v_shelf
    v_shelf.forEach(item=>{
        let category = item.title_template //分区名
        let v_card =  item.v_niche[0].v_card //歌单
        let arr = []
        v_card.forEach(({id,title,cover,time})=>{
            // if(time) {
            //     return
            // } else {
                arr.push({
                    id,
                    title,
                    cover
                })
            // }

        })
        if ( arr.length!== 0) {
            recommendTable.create({
                category,
                categoryList: arr
            }).then(()=>{
                console.log("歌单数据写入成功")
            }).catch(err=>{
                console.log("歌单写入失败" + err)
            })
        }

    })

    await hotkeyTable.deleteMany({})
    let v_hotkey = JSON.parse(body).hotkey.data.vec_hotkey
    let hotkeyArr = []
    v_hotkey.forEach(({description,hotkey_id,title}) =>{
        hotkeyArr.push({
            description,hotkey_id,title
        })
    })
    hotkeyTable.create({
        hotkey: hotkeyArr
    }).then(()=>{
        console.log("热搜写入数据库成功")
    }).catch(err=>{
        console.log("热搜写入数据库失败"+err)
    })
})


// request({
//     method: "GET",
//     url: "https://u.y.qq.com/cgi-bin/musicu.fcg",
//     qs: {
//         "cgiKey": "GetHomePage",
//         "_": 1576499692284,
//         "data": `{ "comm": { "g_tk": 155916146, "uin": 647789540, "format": "json", "inCharset": "utf-8", "outCharset": "utf-8", "notice": 0, "platform": "h5", "needNewCode": 1 }, "MusicHallHomePage": { "module": "music.musicHall.MusicHallPlatform", "method": "MobileWebHome", "param": { "ShelfId": [101, 102, 161] } }, "hotkey": { "module": "tencent_musicsoso_hotkey.HotkeyService", "method": "GetHotkeyForQQMusicMobile", "param": { "remoteplace": "txt.miniapp.wxada7aab80ba27074", "searchid": "1559616839293" } } }`
//     }
// }, async(err, req, body) => {
//     await recommendTable.deleteMany({});
//     let data = JSON.parse(body).MusicHallHomePage.data.v_shelf;
//     data.forEach((item) => {
//         let category = item.title_template;
//         let categoryList = item.v_niche[0].v_card;
//         let arr = [];
//         categoryList.forEach((list) => {
//             // console.log("详细id:" + list.id);
//             // console.log("歌单名词:" + list.title);
//             // console.log("歌单封面地址:" + list.cover);
//             if (list.time) {
//                 arr.push({
//                     id: list.time,
//                     title: list.title,
//                     cover: list.cover
//                 })
//             } else {
//                 arr.push({
//                     id: list.id,
//                     title: list.title,
//                     cover: list.cover
//                 })
//             }
//         });
//         recommendTable.create({
//             category: category,
//             categoryList: arr
//         }).then(()=>{
//             // eslint-disable-next-line no-console
//             console.log("数据写入成功");
//         }).catch(()=>{
//             // eslint-disable-next-line no-console
//             console.log("数据写入失败");
//         })
//     })
// })
