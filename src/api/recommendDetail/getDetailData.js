const  request = require('request')
const {JSDOM} = require('jsdom')
const {detailTable} = require('./detailTable')

module.exports = {
    getRecommendDetail: (req, res) => {
        request({
            method: "GET",
            url: "https://i.y.qq.com/n2/m/share/details/taoge.html?",
            qs: {
                ADTAG: 'newyqq.taoge',
                id: req.params.id //7361181080
            }
        }, (err, response, body) => {
            const dom = new JSDOM(body, {runScripts: "dangerously"});
            let songlist = (dom.window.firstPageData)
            res.send(JSON.stringify(songlist))
            // 查询是否已经存在数据
            detailTable.find({
                id: req.params.id
            }).then(data => {
                if (data.length === 0) {
                    let detailData = {}
                    detailData.id = req.params.id
                    detailData.cover = songlist.taogeData.picurl ||
                        songlist.taogeData.picurl2
                    detailData.title = songlist.taogeData.title
                    detailData.tag = songlist.taogeData.tag
                    detailData.songlist = []

                    songlist.taogeData.songlist.forEach(item => {
                        detailData.songlist.push({
                            singer: item.singer,
                            mid: item.mid,
                            name: item.name
                        })
                    })
                    res.send(JSON.stringify(detailData))
                    detailTable.create(detailData).then(res => console.log("推荐细节数据写入成功"))
                        .catch(err => console.log("歌单细节数据写入失败",err))
                } else {

                }
            }).catch(err => {
                console.log("err:" + err)
            })
        })
    }
}
