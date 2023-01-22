const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const UserModel = require("../models/usersModel.js");

class authController {
  static validateRegistration = async (req, res) => {
    let validated = false;
    console.log(req.body);
    const { email, password } = req.body;

    // Checks if User already exists
    let passwords = await bcrypt.hash(password, 10)
    const user = await UserModel.getUserFromDB(email);
    console.log(passwords)
    const user2 = await UserModel.getUserFromDBByID(passwords)
    if (user.password.length > 0 && user2.password.length > 0) { return res.status(401).json("User exists"), validated = true; }

    else if (!validated) {
      const name = await UserModel.getAllUsersFromDB()
      console.log(name)
      return res.status(201).json(`${name}`);
    }
  };

  static check = async (req, res) => {
    const name = await UserModel.getAllUsersFromDB()
    console.log(name)
    return res.status(201).json(`${name}`);
  }
  static validateLogin = async (req, res) => {
    console.log("hello")
    const { email, password } = req.body;
    const user = await UserModel.getUserFromDB(email);
    let passwords = await bcrypt.hash(password, 10)
    console.log(user)
console.log(passwords)

    const isValid = async () => {
    const compare = await (bcrypt.compare(passwords,user.password)).then(result=>{
      console.log(result)
    })
    console.log(compare)
      if (!compare || user == null) {
        return false
      } else {
        return true
      }

    }
    isValid()
    console.log(isValid())
    res.send(isValid())
  
    const token = jwt.sign({ user_id: user.user_id }, "Your_Secret_Key", {
      expiresIn: "1d",
    });
    //
    const refreshToken = jwt.sign({ user_id: user.user_id }, "Your_Secret_Key", {
      expiresIn: "7d",
    });
    user.isAuth = true;

  };

  static logOut = async (req, res) => {
    return res.clearCookie("access_token").status(200).json("Signed out");
  };

  static authenticate = async (req, res) => {
    const token = req.body.refreshToken;
    if (!token) {
      return res.status(401).json(`Not authenticated`);
    }
    jwt.verify(token, "Your_Secret_Key", async (err, decoded) => {
      if (err) {
        return res.status(401).json(`Not authenticated`);
      } else {
        try {
          const id = decoded.id;
          const user = await UserModel.getUserFromDBByID(id);
          const accessToken = jwt.sign(user, "Your_Secret_Key", {
            expiresIn: "1d",
          });
          user.isAuth = true;
          return res.status(201).json({
            token: accessToken,
            user,
          });
        } catch (err) {
          return res.status(401).json("Not authenticated");
        }
      }
    });
  };
}
module.exports = authController