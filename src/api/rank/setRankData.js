/* eslint-disable no-console */
const request = require('request')
const fs = require('fs')
const {rankTable} = require('./rankTable')
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/erduomusic',{
		useNewUrlParser: true,
		useFindAndModify: true
}).then(()=>{
	console.log("数据库连接成功")
}).catch(err=>{
	console.log("数据库连接失败err:", err)
})
request({
	method: 'GET',
	url: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
	qs: {
		_: 1578983441350,
		data: `{
			"comm": {
				"g_tk": 519082237,
				"uin": 869827329,
				"format": "json",
				"inCharset": "utf-8",
				"outCharset": "utf-8",
				"notice": 0,
				"platform": "h5",
				"needNewCode": 1,
				"ct": 23,
				"cv": 0
			}, "topList": {"module": "musicToplist.ToplistInfoServer", "method": "GetAll", "param": {}}
		}`
	}
}, (err,res,body)=>{
	fs.exists('./demo.json',ifExists=>{
		if(!ifExists) {
			fs.writeFile('./demo.json',body,{encoding:'utf8'},err=>{
				if(err) {
					console.log("rank文件写入失败")
				} else {
					console.log("rank文件写入成功")
				}
			})
		}
	})
	let data = JSON.parse(body);
	// eslint-disable-next-line no-console
	// console.log(data.topList.data.group);
	let finalData = [];
	data.topList.data.group.forEach((item)=>{
		item.toplist.forEach((list)=>{
			let listData = {};
			listData.picUrl=list.headPicUrl;
			listData.intro=list.intro;
			listData.title=list.title;
			listData.topId=list.topId;
			listData.songlist=[];
			list.song.forEach((songItem)=>{
				listData.songlist.push({
					songName:songItem.title,
					albumMid:songItem.albumMid,
					singerName:songItem.singerName,
					singerMid: songItem.singerMid
				})
			});
			finalData.push(listData);
		})
	});
	rankTable.create(
		finalData
	).then(()=>{
		console.log("rank数据写入数据库成功")
	}).catch(err=>{
		console.log("rank数据写入数据库失败err:",err)
	})
})

