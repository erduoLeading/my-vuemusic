const mongoose = require('mongoose')
const Schema = mongoose.Schema
const singerDetailSchema = new Schema({
    singer_name: {
        type:String,
        required:true
    },
    singer_mid: {
        type:String,
        required:true
    },
    singer_pmid: {
        type:String,
        required:true
    },
    singer_id: {
        type:Number,
        required:true
    },
    SingerDesc: {
        type:String,
        required:true
    },
    songTotalNumber:{
        type:Number,
        required:true
    },
    fansTotalNumber:{
        type:Number,
        required:true
    },
    songList:[
        {
            songName:{
                type:String,
                required:true
            },
            songMid:{
                type:String,
                required:true
            },
            songAlbum:{
                type:String,
                required:true
            }
        }
    ]

})

module.exports = {
    singerDetailTable: mongoose.model("singerDetailTable",singerDetailSchema)
}
