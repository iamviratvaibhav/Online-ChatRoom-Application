import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const secureRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        if (!decoded) {
            return res.status(402).json({ message: "Not Verified token" });
        }
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(403).json({ message: "User not found" });
        }
        req.user = user; //  should be in lowercase
        next();
    } catch (error) {
        console.log("Error in secureRoute middleware:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default secureRoute;
