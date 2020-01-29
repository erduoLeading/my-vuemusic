/*
    推荐表的数据库表格写入
 */
const request = require('request')
const fs = require('fs')
const path = require('path')
const {recommendTable,hotkeyTable} = require('./recommendTable')

//爬取数据到demo.json
// request({
//     method: 'GET',
//     url: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
//     qs: {
//         cgiKey: 'GetHomePage',
//         _: 1577860123682,
//         data: `{"comm":{"g_tk":833124585,"uin":869827329,"format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"h5","needNewCode":1},"MusicHallHomePage":{"module":"music.musicHall.MusicHallPlatform","method":"MobileWebHome","param":{"ShelfId":[101,102,161]}},"hotkey":{"module":"tencent_musicsoso_hotkey.HotkeyService","method":"GetHotkeyForQQMusicMobile","param":{"remoteplace":"txt.miniapp.wxada7aab80ba27074","searchid":"1559616839293"}}}`
//     }},(err, res, body)=>{
//     fs.writeFile(__dirname + '/demo.json',body,{
//         encoding:'utf8'
//     },err=>{
//         if (err) {
//             console.log(err)
//         } else {
//             console.log("写入demo成功")
//         }
//     })
// })

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
			if(time) {
				return
			} else {
				arr.push({
					id,
					title,
					cover
				})
			}

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


})



