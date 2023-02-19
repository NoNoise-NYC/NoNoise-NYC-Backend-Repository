const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/noNoise', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  badged_id: { type: Number, default: 0 },
});

userSchema.plugin(AutoIncrement, { inc_field: 'id' });

const User = mongoose.model('users', userSchema);

class Users {
  static async grabUsersFromDB() {
    try {
      const users = await User.find({}).select("-password");
      return users;
    } catch (error) {
      throw new Error(error);
    }
  }
      
  static async grabLatestUserIdFromDB() {
    try {
      const latestUser = await User.findOne().sort({ id: -1 });
      return latestUser.id;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async grabUsersDataByEmailFromDB(userEmail) {
    try {
      const user = await User.findOne({ email: userEmail });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async grabUserIdGivenUsernameFromDB(username) {
    try {
      const user = await User.findOne({ username });
      return user.id;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async grabUsernameAndEmailFromDB(id) {
    try {
      const user = await User.findOne({ id}, { username: 1, email: 1 });
      const { username, email } = user;
      return { username, email };
    } catch (error) {
      throw new Error(error);
    }
  }
  
  static async grabPasswordByEmailFromDB(email) {
    try {
      const user = await User.findOne({ email }, { password: 1 });
      return user.password;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async grabBadgeByUsernameFromDB(username) {
    try {
      const user = await User.findOne({ username }, { badged_id: 1 });
      return user.badged_id;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async createAccountToDB(username, email, password, badgedId) {
    try {
      const newUser = await User.create({ username, email, password, badged_id: badgedId });
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async updateBadgeOnDB(newBadge, username) {
    try {
      const updatedUser = await User.findOneAndUpdate({ username }, { badged_id: newBadge }, { new: true });
      return updatedUser;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = { Users, User };

process.on('SIGINT', () => {
  mongoose.connection.close();
  process.exit();
}); 
