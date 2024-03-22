const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todosSchema = new Schema({
    todo: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,

    },
    date:{
        type:String,
    },
    time:{
        type:String,
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'Users',
       
    },
})

module.exports = mongoose.model("Todos", todosSchema) 