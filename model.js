const mongoose=require('mongoose');

// Schema for movieList

const userSchema= new mongoose.Schema({
     
    MovieName:{
        type:'String',
        required:true
    },
    Rating:{
        type:'Number',
        required:true
    },
    Cast:{
        type:'Array',
        required:true
    },
    Genre:{
        type:'String',
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },

})

const movieList=mongoose.model('movie',userSchema);

module.exports=movieList;