const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// sing up controller steps : 
//    1. use bcrypt hash to hash the password given 
//    2. create a new User using the data provided  
//    3. save the new user to the database
//    4. if user was saved , successfull status and mesage - else catch the error
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
      (hash) => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save().then(
          () => {
            res.status(201).json({
              message: 'User added successfully!'
            });
          }
        ).catch(
          (error) => {
            res.status(500).json({
              error: error
            });
          }
        );
      }
    );
};


// login controller steps :
//    1. fetch the user with the corresponded email from the databse 
//    2. if there is no user return a response - and if the find action launched an error , lauch a 500 server error
//    3. else  compare the two passwords useing bcrypt.compare 
//    4. if the password don't match , return a response with the incorrect password error
//    5. if they do match , return the user id with the token in json
exports.login = (req,res,next)=>{
    User.findOne({email: req.body.email}).then((user) =>{
        if(!user){
            return res.status(401).json(
                {error : new Error("User was not found")}
            )
        } 
        bcrypt.compare(req.body.password , user.password ).then(
            (valid)=>{
                // if the passwords match  -> success
                if(!valid) {
                    return res.status(401).json({message: "Incorrect password"});
                }     
                const token = jwt.sign(
                   {userId: user._id} ,
                   "RANDOM_TOKEN_SECRET",
                   {expiresIn : "24h"}
                );
                res.status(200).json({
                  userId : user._id ,
                    token : token
                })
            }
        ).catch((error)=>{
            res.status(500).json({error: error})
        })
    }
    ).catch((error) =>{
        res.status(500).json({error: error });
    })
}