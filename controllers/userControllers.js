const bcrypt = require('bcrypt');
const User = require('../model/userModel');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.grabUsersFromDB();
    res.send(users);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve users' });
  }
};

const loginAuthentication = async (req, res) => {
  try {
    const user = await User.grabUsersDataByEmailFromDB(req.body.email);
    if (user) {
      const passCheck = await bcrypt.compare(req.body.password, user.password);
      if (passCheck) {
        res.send({ alert: 'logged in', data: user });
      } else {
        res.status(401).send({ alert: 'invalid log in' });
      }
    } else {
      res.status(401).send({ alert: 'invalid log in' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Failed to authenticate' });
  }
};

const addUserInfo = async (req, res) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = await User.createAccountToDB(req.body.id, req.body.username, req.body.email, hashedPassword, req.body.badged_id);
    res.send(newUser);
  } catch (error) {
    res.status(500).send({ error: 'Failed to create user' });
  }
};

const getUsernameAndEmail = async (req, res) => {
  try {
    const user = await User.grabUsernameAndEmailFromDB(req.query.username);
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve user information' });
  }
};

module.exports = {
  getAllUsers,
  loginAuthentication,
  addUserInfo,
  getUsernameAndEmail
};
