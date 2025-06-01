import { User } from "../models/user.model.js";

const FindUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        return error;
    }
}

const FindUserById = async (id) => {
    try {
        const user = await User.findById(id);
        return user;
    } catch (error) {
        return error;
    }
}

const CreateUser = async (name, email, password) => {
    try {
        const user = await User.create({ name, email, password });
        return user;
    } catch (error) {
        return error;
    }
}

export default {
    FindUserByEmail,
    FindUserById,
    CreateUser
}