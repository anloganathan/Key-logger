const mongoose=require('mongoose');

const keylogs=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    text:{
        type:[{keys:String}],
        required:true
    }
});

const users=new mongoose.Schema({
    username:{
        type:String,
        required:true
    }
});
const keylog=mongoose.model('keylog',keylogs);
const user=mongoose.model('user',users);

module.exports={
    keylog,user
};