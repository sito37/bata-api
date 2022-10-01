const User = require('../models/user-model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')

exports.signup = (req, res) => {

  // const errors = validationResult(req)
  //   if(errors.array().length > 0){
  //       return res.status(400).json({error: errors.array()[0].msg})
  //   }


    User.findOne({ email: req.body.email }).exec( async (error, user) => {
        if (user) {
          res.status(400).json({
            message: "user already exist",
          });
        }
    
        const { firstName, lastName, email, password } = req.body;
        
        const hash_password = bcrypt.hash(password, 10)
        const _user = new User({
          firstName,
          lastName,
          email,
          hash_password,
          userName: Math.random().toString(),
        });
    
        _user.save((error, data) => {
          if (error) {
            res.status(400).json({
              message: "something went wrong",
            });
          }
    
          if (data) {
            res.status(201).json({data});
          }
        });
      });
}

exports.signin = (req, res) => {
  User.findOne({email: req.body.email})
  .exec((error, user) => {
    if(error) return res.status(400).json({message: 'something went wrong'})

    if(user){
        if(user.authenticate(req.body.password)){
          const token = jwt.sign({ _id: user._id, role: user.role}, process.env.SECRET_KEY, { expiresIn: '1h'}) 

          const {_id, firstName, lastName, email, role, fullName} = user
          res.status(201).json({
            token,
            user: {_id, firstName, lastName, email, role, fullName}
          })
        }else{
          res.status(400).json({
            message: 'invalid password'
          })
        }
        
    }
  })
}

