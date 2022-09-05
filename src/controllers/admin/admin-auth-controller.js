const User = require('../../models/user-model')
const jwt = require('jsonwebtoken')

exports.adminSignup = (req, res) => {
    User.findOne({ email: req.body.email }).exec((error, user) => {
        if (user) {
          res.status(400).json({
            message: "admin already exist",
          });
        }
    
        const { firstName, lastName, email, password } = req.body;
    
        const _user = new User({
          firstName,
          lastName,
          email,
          password,
          userName: Math.random().toString(),
          role: 'admin'
        });
    
        _user.save((error, data) => {
          if (error) {
            res.status(400).json({
              message: "something went wrong",
            });
          }
    
          if (data) {
            res.status(201).json({
              message: 'admin created successfully'
            });
          }
        });
      });
}

exports.adminSignin = (req, res) => {
  User.findOne({email: req.body.email})
  .exec((error, user) => {
    if(error) return res.status(400).json({message: 'something went wrong'})

    if(user){
        if(user.authenticate(req.body.password) && user.role === 'admin'){
          const token = jwt.sign({ _id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h'}) 

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

