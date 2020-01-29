const request = require('request')
const {rankTable} = require('./rankTable')
module.exports = {
	getRankData: (req, res) => {
		rankTable.find({}, {
			_v: false,
			_id: false
		}).then(data => {
			if (Number(data) == 0) {
				request(
					{
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
					},
					(err, respond, body) => {
						let data = JSON.parse(body);
						// eslint-disable-next-line no-console
						// console.log(data.topList.data.group);
						let finalData = [];
						data.topList.data.group.forEach((item) => {
							item.toplist.forEach((list) => {
								let listData = {};
								listData.picUrl = list.headPicUrl;
								listData.intro = list.intro;
								listData.title = list.title;
								listData.topId = list.topId;
								listData.songlist = [];
								list.song.forEach((songItem) => {
									listData.songlist.push({
										songName: songItem.title,
										albumMid: songItem.albumMid,
										singerName: songItem.singerName,
										singerMid: songItem.singerMid
									})
								});
								finalData.push(listData);
							})
						});
						rankTable.create(
							finalData
						).then(() => {
							console.log("rank数据写入数据库成功")
							res.send(finalData)
						}).catch(err => {
							console.log("rank数据写入数据库失败err:", err)
						})
					}
				)
			}else {
					res.send(data)
			}
		})
	}
}