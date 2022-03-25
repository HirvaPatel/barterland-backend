const express = require ('express');
const mongoose = require ('mongoose')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const router = express.Router();
const uuid = require("uuid");

var users = require('../model/users')
console.log(users);


//To find if the user is present
 router.post('/login', (req, res) => {
    users.findOne({ email: req.body.email }).then((user) => {
        bcrypt .compare(req.body.password, user.password) .then((passwordCheck) => {
  
            // check if password matches
            if(!passwordCheck) {
              return response.status(400).send({
                message: "Passwords does not match",
                success: false,
                error,
              });
            }else{
            return res.status(200).json({
                message: "user retrieved",
                success: true,
                users: result
            })
        }
        })

    }).catch(error =>{
        console.log(err =>{
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        })
    })   

})
    
  
// To retrieve all the users present
router.get('/users',(req,res)=>{
    users.find().exec().then(result =>{
        if(users || users.length){
            return res.status(200).json({
                message: "users retrieved",
                success: true,
                users: result
            })
        }

    }).catch(error =>{
            console.log(err =>{
                return res.status(500).json({
                    message: "Internal server error",
                    success: false
                })
            })
    })

})

// To add a user to the application.
router.post('/add',(req,res)=>{
    var user_id =  uuid.v4();
    var email = req.body.email;
    //var password = req.body.password;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var role = "user";
    var created_at = Date.now();
    var security_ques = req.body.security_ques;
    var security_ans = req.body.security_ans;
    var address = req.body.address;

    bcrypt.hash(req.body.password, 10)
  .then((hashedPassword) => {
    const newUser = new users({
            _id : new mongoose.Types.ObjectId,
            user_id,
            email,
            password: hashedPassword,
            first_name,
            last_name,
            role,
            created_at,
            security_ques,
            security_ans,
            address

    })

    newUser.save().then(result =>{
        console.log(result);
        return res.status(201).json({
            message: "User added",
            success: true
        })
    }).catch(error=>{
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    })   

}).catch((e) => {
    response.status(500).send({
      message: "Password was not hashed successfully",
      e,
    });
  });
});


module.exports=router;