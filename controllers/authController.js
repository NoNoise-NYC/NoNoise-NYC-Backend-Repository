const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../model/usersModel');
const UserController = require('../controllers/userControllers');

class AuthController {
  static validateRegistration = async (req, res) => {
    const { email, password } = req.body;
    let user = await UserModel.getUserFromDB(email);
    if (user) {
      return res.status(401).json('User already exists');
    }
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await UserModel.createUser({ email, password: hashedPassword });
    return res.status(201).json(user);
  }

  static validateLogin = async (req, res) => {
    const { email, password } = req.body;
    let user = await UserModel.getUserFromDB(email);
    if (!user) {
      return res.status(401).json('Invalid credentials');
    }
    // compare the hashed password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json('Invalid credentials');
    }
    const token = jwt.sign({ user_id: user.user_id }, 'Your_Secret_Key', {
      expiresIn: '1d',
    });
    //
    const refreshToken = jwt.sign({ user_id: user.user_id }, 'Your_Secret_Key', {
      expires
      in: '7d',
    });
    user.isAuth = true;
    return res.status(200).json({ token, refreshToken, user });
  }

  static logOut = async (req, res) => {
    return res.clearCookie('access_token').status(200).json('Signed out');
  }

  static authenticate = async (req, res) => {
    const token = req.body.refreshToken;
    if (!token) {
      return res.status(401).json('Not authenticated');
    }
    jwt.verify(token, 'Your_Secret_Key', async (err, decoded) => {
      if (err) {
        return res.status(401).json('Not authenticated');
      } else {
        try {
          const id = decoded.user_id;
          const user = await UserModel.getUserFromDBByID(id);
          const accessToken = jwt.sign(user, 'Your_Secret_Key', {
            expiresIn: '1d',
          });
          user.isAuth = true;
          return res.status(201).json({
            token: accessToken,
            user,
          });
        } catch (err) {
          return res.status(401).json('Not authenticated');
        }
      }
    });
  }
}

module.exports = AuthController;

