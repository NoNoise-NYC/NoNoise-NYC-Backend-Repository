const bcrypt = require('bcrypt')
const User = require('../model/userModel')

const getAllUsers = async (request, response) => {
    try {
        const users = await User.find({});
        response.send(users);
    } catch (error) {
        throw new Error(error);
    }
}

const loginAuthentication = async (request, response) => {
    try {
        const user = await User.findOne({ email: request.params.email });
        if (user) {
            const passCheck = await bcrypt.compare(request.params.password, user.password);
            if (passCheck) {
                response.send({ alert: 'logged in', data: user });
            } else {
                response.send({ alert: 'invalid log in' });
            }
        } else {
            response.send({ alert: 'invalid log in' });
        }
    } catch (error) {
        throw new Error(error);
    }
}

const addUserInfo = async (request, response) => {
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(request.body.password, salt);
        const newUser = await User.create({
            id: request.body.id,
            username: request.body.username,
            email: request.body.email,
            password: hashedPassword,
            badged_id: request.body.badged_id
        });
        response.send(newUser);
    } catch (error) {
        throw new Error(error);
    }
}

const getUsernameAndEmail = async (request, response) => {
    try {
        const user = await User.findOne({ username: request.params.username }, { username: 1, email: 1 });
        response.send(user);
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getAllUsers,
    loginAuthentication,
    addUserInfo,
    getUsernameAndEmail
}
