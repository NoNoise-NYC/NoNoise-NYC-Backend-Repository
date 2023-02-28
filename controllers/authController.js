const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Users} = require('../model/userModel');


class AuthController {
  static validateRegistration = async (req, res) => {
    try {
      const { username,email, password } = req.body;
      let user = await Users.grabUsersDataByEmailFromDB(email);
      if (user) {
        return res.status(401).json('User already exists');
      }
      // hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // user = await Users.grabUsersDataByEmailFromDB({ email});
      return res.status(201).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json('Error occurred during registration');
    }
  }

  static validateToken = async (token) => {
    try {
      const decoded = jwt.verify(token, 'Your_Secret_Key');
      const user = await Users.grabUsernameAndEmailFromDB(decoded.id);
      if (user.isAuth) {
        return user;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  
  static validateLogin = async (req, res) => {
    try {
      let isAuth = false
      const { email, password } = req.body;
      console.log(email)
      const user = await Users.grabUsersDataByEmailFromDB(email);
      console.log(user.email)
      console.log(user)
      console.log(user.password)

      if (user.email!==email) {

        return res.status(401).json('Invalid credentials');
      }
      
      // compare the hashed password
//       const saltRounds = 10;
//       const salt = await bcrypt.genSalt(saltRounds);
//       const hashedPassword = await bcrypt.hash(req.body.password, salt);
//       console.log(hashedPassword)
//      const isValid = await bcrypt.compare(hashedPassword, user.password);
// if (!isValid) {
//   return res.status(401).json('Invalid password credentials');
// } 

      
      
      const token = jwt.sign({ id: user.id }, 'Your_Secret_Key', {
        expiresIn: '1d',
      });
      //
      const refreshToken = jwt.sign({ id: user.id }, 'Your_Secret_Key', {
        expiresIn: '7d',
      });
      isAuth = true;
      console.log(refreshToken)
      console.log(token)

      return res.status(200).json({ refreshToken,token,user,isAuth});
    
    } catch (error) {
      console.log(error);
      return res.status(500).json('Error occurred during login');
    }
  }
  
  
  static authenticate = async (req, res) => {
    try {
      const token = req.body.refreshToken;
      if (!token) {
        return res.status(401).json('Not authenticated');
      }
      jwt.verify(token, 'Your_Secret_Key', async (err, decoded) => {
        if (err) {
          return res.status(401).json('Not authenticated');
        } else {
          try {
            const id = decoded.id;
            const user = await Users.grabUsernameAndEmailFromDB(id);
            const accessToken = jwt.sign(user, 'Your_Secret_Key', {
              expiresIn: '1d',
            });
            user.isAuth = true;
            return res.status(201).json({
              token: accessToken,
              user,
            });
          } catch (err) {
            console.log(err);
            return res.status(401).json('Not authenticated');
          }
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json('Error occurred during authentication');
    }
  }
  



}
module.exports = AuthController;

