import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../jwt/generateToken.js";

const signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            console.log("Password,", password, "Confirm Password", confirmPassword)
            return res.status(400).json({ message: "Password and confirm password do not match" })
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already exists" })
        }

        //hasing the password
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await new User({
            name,
            email,
            password: hashPassword
        })
        await newUser.save();
        if (newUser) {
            createTokenAndSaveCookie(newUser._id, res);
            res.status(201).json({
                message: "User created Successfully", user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,

                },
            });
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


const login = async (req, res) => {
    const { email, password } = req.body;
    try {

        const user = await User.findOne({ email });
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch || !user) {
            return res.status(400).json({ message: "Invalid credentials: Username and Password" });
        }
        createTokenAndSaveCookie(user._id, res);
        return res.status(200).json({
            message: "Login Successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,

            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        return res.status(200).json({ message: "Logout Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" })
    }
}


const getUserProfile = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const loggedUser = req.user._id;
        const filterUser = await User.find({ _id: { $ne: loggedUser } }).select("-password");
        return res.status(200).json({ filterUser });
    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ message: "Server Error" })
    }
}

export { signup, login, logout, getUserProfile }