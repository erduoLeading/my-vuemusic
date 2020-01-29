const {singerTable} = require('./singerTable')
module.exports = {
    getSingerData: function getSingerData(req, res) {
        singerTable.find({}, {
            _v: false,
            _id: false,
        }).then(data => {
            res.send(JSON.stringify(data))
        }).catch(err => {
            // eslint-disable-next-line no-console
            console.log("歌手数据获取失败:", err)
        })
    }
}

