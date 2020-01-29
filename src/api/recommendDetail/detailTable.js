const mongoose = require('mongoose')
const Schema = mongoose.Schema

const detailSchema = new Schema({
    id:{
        type: String,
        required: true
    },
    cover:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    tag:[ //专区名字
        {
            id:{
                type: Number,
                required: true
            },
            name:{
                type: String,
                required: true
            },
        }
    ],
    songlist: [ //专区音乐
        {
			songMid: {
				required: true,
				type: String
			},
			songName: {
				required: true,
				type: String
			},
			songAlbum: {
				required: true,
				type: String
			},
            singer:[ //歌手信息
                {
                    id:{
                        type: String,
                        required: true
                    },
                    mid:{
                        type: String,
                        required: true
                    },
                    name:{ //歌手名字
                        type: String,
                        required: true
                    },
                    title:{ // 歌手名字
                        type: String,
                        required: true
                    },
                }
            ]
        }

    ]
})

module.exports = {
    detailTable: mongoose.model('detailTable', detailSchema)
}
