const mongoose = require('mongoose')
const Schema = mongoose.Schema
let rankSchema = new Schema({
	picUrl:{
		type:String,
		required:true
	},
	intro:{
		type:String,
		required:true
	},
	title:{
		type:String,
		required:true
	},
	topId:{
		type:Number,
		required:true
	},
	songlist:[
		{
			songName:{
				type:String,
				required:true
			},
			albumMid:{
				type:String,
				required:true
			},
			singerName:{
				type:String,
				required:true
			},
			singerMid:{
				type:String,
				required:true
			}
		}
	]

})

module.exports = {
	rankTable: mongoose.model('rankTable',rankSchema)
}