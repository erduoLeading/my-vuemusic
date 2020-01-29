const mongoose = require('mongoose')

const Schema = mongoose.Schema
const singerSchema = new Schema({
    singer_id : Number,
    singer_mid: String,
    singer_name: String,
    singer_pic: String
})

module.exports = {
    singerTable: mongoose.model('singerTable', singerSchema)
}
