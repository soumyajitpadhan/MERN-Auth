import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.json({ success: false, message: "Not authorized. Login again" });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id;
        }
        else {
            return res.json({ success: false, message: "Not authorized. Login again" });
        }

        next();
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export default userAuth;

