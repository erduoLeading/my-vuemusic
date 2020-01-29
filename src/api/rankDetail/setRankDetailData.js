const request = require('request')
const {JSDOM} = require('jsdom')
const fs = require('fs')
const mongoose= require('mongoose')
const {rankDetailTable} = require('./rankDetailTable')
mongoose.connect('mongodb:127.0.0.1:27017/erduomusic',{
	useNewUrlParser: true,
	useFindAndModify: true
}).then(()=>{
	console.log("数据库连接成功")
}).catch(err=>{
	console.log("数据库连接失败err",err)
})
request(
	{
		method: "GET",
		url: 'https://i.y.qq.com/n2/m/share/details/toplist.html',
		qs: {
			ADTAG: 'myqq',
			from: 'myqq',
			channel: 10007100,
			id: 4//实际id 榜单id
		}
	},
	(err, response, body) => {
		if (err) {
			console.log("rankDetail数据爬取失败err:", err)
			return
		}
		let dom = new JSDOM(body, {runScripts: "dangerously"});
		let firstPageData = dom.window.firstPageData;
		console.log(firstPageData)
		fs.exists('./demo.json',ifExists=>{
			if (!ifExists) {
				fs.writeFile('./demo.json',JSON.stringify(firstPageData),{encode:'utf8'},err=>{
					if(err){
						console.log("ranDetail数据写入文件失败err:",err)
					}else {
						console.log("rankDetail数据写入文件成功")
					}
				})
			}
		})
	})

