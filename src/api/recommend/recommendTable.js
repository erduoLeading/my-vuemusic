const mongoose = require('mongoose')
const Schema = mongoose.Schema




let recommendSchema = new Schema({
    category:{
        type: String,
        required: true
    },
    categoryList:[
        {
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
            }
        }
    ]
})
let HotKeySchema = new Schema({
    hotkey:[
        {
            description:{
                type:String,
                required: true
            },
            hotkey_id: {
                type:String,
                required: true
            },
            title:{
                type: String,
                required: true
            }
        }
    ]
})
module.exports = {
    recommendTable: mongoose.model('recommendTable',recommendSchema),
    hotkeyTable: mongoose.model('HotKeyTable',HotKeySchema)
}
