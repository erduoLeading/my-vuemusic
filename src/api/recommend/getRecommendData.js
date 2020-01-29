/*
    推荐歌单接口

 */
const {recommendTable} = require('./recommendTable')


module.exports = {
    getRecommendData: (req, res) => {
        recommendTable.find({}, {
            _id: false,
            _v: false,
        }).then(data => {
            res.send(JSON.stringify(data))
        }).catch(err => {
            // eslint-disable-next-line no-console
            console.log("歌单推荐数据获取失败:" + err)
        })
    }
}
