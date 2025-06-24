import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,

    },
    confirmPassword: {
        type: String,
        require: true,
    },
},
    {
        timeStamp: true,  //createdon, updatedon
        createdOn: true,
        updatedOn:true,

    }
);

const User = mongoose.model('User', userSchema);
export default User;

