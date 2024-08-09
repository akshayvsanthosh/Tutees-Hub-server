const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    studImage:{
        type:String,
        required:true
    },
    studId:{
        type:String,
        required:true,
        unique:true
    },
    studName:{
        type:String,
        required:true
    },
    studCourse:{
        type:String,
        required:true
    },
    studStatus:{
        type:String,
        required:true
    }
})

const students = mongoose.model("students",studentSchema)
module.exports= students