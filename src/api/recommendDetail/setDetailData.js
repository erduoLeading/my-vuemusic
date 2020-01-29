const request = require("request");
const { detailTable } = require("./detailTable");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = {
	getRecommendDetailData: function(req, res) {
		// eslint-disable-next-line no-console
		console.log("getRecommendDetailData api 运行")
		//第一步,查询数据
		detailTable
			.find({
				id: req.params.id
			})
			.then(data => {
				// eslint-disable-next-line no-console
				console.log(Number(data));
				if (Number(data) === 0) {
					// eslint-disable-next-line no-console
					console.log("此时数据库中无数据");
					request(
						{
							method: "GET",
							url: "https://i.y.qq.com/n2/m/share/details/taoge.html",
							qs: {
								ADTAG: "newyqq.taoge",
								id: req.params.id
							}
						},
						function(error, response, body) {
							const dom = new JSDOM(body, { runScripts: "dangerously" });
							let songlist = dom.window.firstPageData;
							//查询是否已存在数据
							let finalData = {};
							finalData.id = req.params.id;
							finalData.cover = songlist.taogeData.picurl || songlist.taogeData.headurl; //设置封面
							finalData.title = songlist.taogeData.title; //设置专辑标体
							finalData.tag = []; //预设一个空的数据,存储专辑类型
							finalData.songlist = []; //预设一个空的数据,存储专辑歌曲列表
							songlist.taogeData.tag.forEach(item => {
								finalData.tag.push({
									id: item.id,
									name: item.name
								});
							});
							songlist.taogeData.songlist.forEach(item => {
								let singer = [];
								item.singer.forEach(singerList => {
									singer.push(singerList);
								});
								finalData.songlist.push({
									songMid: item.mid,
									songName: item.name,
									songAlbum:songlist.taogeData.title,
									singer: singer
								});
							});
							res.send(JSON.stringify(finalData));
							detailTable.create(finalData);
						}
					);
				} else {
					// eslint-disable-next-line no-console
					console.log("此时数据库中有数据");
					res.send(JSON.stringify(data));
				}
			});
	}
};