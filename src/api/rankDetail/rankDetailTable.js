const mongoose = require('mongoose')
const Schema = mongoose.Schema
const rankDetailSchema = new Schema({
	headPicUrl:String,
	titleDetail:String,
	songlist:[
		{
			songAlbum:String,
			songMid:String,
			songName:String,
		}
	]
})


module.exports = {
	rankDetailTable: mongoose.model('rankDetailTable',rankDetailSchema)
}