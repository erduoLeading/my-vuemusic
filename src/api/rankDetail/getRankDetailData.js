// const {rankDetailTable} = require('./rankDetailTable')
const request = require('request')
const {JSDOM} = require('jsdom')
//因为榜单歌曲实时更新，所以我们不再创建表，每次都去请求最新的表,我们采用方式1获取数据
//方式1:
module.exports={
	getRankDetailData:function (req,res,err) {
		let topId = req.params.id;
		request({
			url:"https://i.y.qq.com/n2/m/share/details/toplist.html",
			qs:{
				ADTAG:"myqq",
				"from":"myqq",
				channel:10007100,
				id:topId
			}
		},function (err,response,body) {
			let dom = new JSDOM(body,{runScripts:"dangerously"});
			let data=dom.window.firstPageData;
			let finailData= {};
			finailData.headPicUrl=data.toplistData.headPicUrl;//歌单封面
			finailData.titleDetail=data.toplistData.titleDetail;// 歌单,名称
			finailData.songlist=[];
			data.songInfoList.forEach((item)=>{
				finailData.songlist.push({
					songAlbum:item.album.name,
					songMid:item.mid,
					songName:item.title
				})
			})
			res.send(finailData);
		})
	}
}


// //方式2：
// module.exports = {
// 	getRankDetailData: (req,res) =>{
// 		rankDetailTable.fin({},{
// 			_id: false,
// 			_v: false
// 		}).then(data=>{
// 			if(Number(data) == 0) {
// 				request(
// 					{
// 						method:"GET",
// 						url:'https://i.y.qq.com/n2/m/share/details/toplist.html',
// 						qs:{
// 							ADTAG:'myqq',
// 							from:'myqq',
// 							channel:10007100,
// 							id:4//实际id 榜单id
// 						}
// 					},
// 					(err,response,body)=>{
// 						if(err) {
// 							console.log("rankDetail数据爬取失败err:",err)
// 							return
// 						}
// 						let dom = new JSDOM(body,{runScripts:"dangerously"});
// 						let firstPageData= dom.window.firstPageData;
// 						let finailData= {};
// 						finailData.headPicUrl=data.toplistData.headPicUrl;//歌单封面
// 						finailData.titleDetail=data.toplistData.titleDetail;// 歌单,名称
// 						finailData.songlist=[];
// 						data.songInfoList.forEach((item)=>{
// 							finailData.songlist.push({
// 								songAlbum:item.album.name,
// 								songMid:item.mid,
// 								songName:item.title
// 							})
// 						})
// 						res.send(finailData);
// 					})
//
// 						//填表
// 						//todo
// 			} else {
// 				res.send(data)
// 			}
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// 		}).catch(err=>{
// 			console.log("rankDetail数据获取失败")
// 		})
// 	}
// }