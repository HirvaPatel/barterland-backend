const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");


const router = express.Router();

var mongo = require('../mongo');


mongo.connectDB(async (err) => {
    if (err) throw err;
    const db = mongo.getDatabase();

    router.get('/getad/:value', async (req,res) => {
            const value = req.params.value;
            console.log(value);
            
          
                    

    });
    
   
});

module.exports = router;