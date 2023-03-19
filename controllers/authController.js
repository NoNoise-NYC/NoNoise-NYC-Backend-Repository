const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Users} = require('../model/userModel');


class AuthController {
  static validateRegistration = async (req, res) => {
    const isAvailable =  true
    console.log(req.body)

      const { username, email, password } = req.body;
      const user = await Users.grabUsersDataByEmailFromDB(email);
      console.log(user)
      if (user) {
        if (user.email === email) {
          return res.send('Email already exists');
        } else if (user.username === username) {
          return res.status(400).json({"Error": "Username already exists"});
} 
        
      }else{
        console.log(isAvailable)

      return res.status(201).json({isAvailable})} 
   
      console.log(error);
      return res.status(500).json('Error occurred during registration');
    
  }
  
  static validateLogin = async (req, res) => {
    try {
      let isAuth = false
      const { email, password } = req.body;
      console.log(email)
      console.log(password)
      const user = await Users.grabUsersDataByEmailFromDB(email);
      console.log(user.email)
      console.log(user)
      console.log(user.password)

      if (!user.username) {
        return res.status(401).json('Invalid credentials');
      }
  
      else {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      console.log(hashedPassword)
     if(bcrypt.compareSync(password, user.password)|| email.match(email)){

      const token = jwt.sign({ id: user.id }, 'Your_Secret_Key', {
        expiresIn: '1d',
      });
      //
      const refreshToken = jwt.sign({ id: user.id }, 'Your_Secret_Key', {
        expiresIn: '7d',
      });
      isAuth = true;
    
      console.log(token)

      return res.status(200).json({ refreshToken,token,user,isAuth});}
      else {
        return res.status(401).json('Invalid credentials');
      }
    
    } }catch (error) {
      console.log(error);
      return res.status(500).json('Error occurred during login');
    }
  }



  static authenticate = async (req, res) => {
    let isAuth = true
    try {
      const token = req.body.token;
      console.log(token)

      if (!token) {
        return res.status(401).json('Not authenticated');
      }
      else{
      const userId = jwt.verify(token, 'Your_Secret_Key').id
      
            const id = decoded.id;
            console.log(id)
            const user = await Users.grabUsernameAndEmailFromDB(userId);
            console.log(user)
            const accessToken = jwt.sign(user, 'Your_Secret_Key', {
              expiresIn: '1d',
            });
            
            return res.status(201).json({
              token: accessToken,
              user,
             
              isAuth 
            })
          } }
          catch (err) {
            console.log(err);
            return res.status(401).json('Not authenticated'); 
          }
    }
  }

module.exports = AuthController;

