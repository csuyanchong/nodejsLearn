const jwt = require('jsonwebtoken');
const User = require('../model/User');
const bcrypt = require('bcrypt');


const handleRefreshToken = async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.jwt) {
        return res.sendStatus(401);
    }
    console.log(cookie.jwt);
    const refreshToken = cookie.jwt;

    // 查找
    const target = await User.findOne({ refreshToken: refreshToken }).exec();;
    if (!target) {
        // 没找到
        return res.sendStatus(403); // forbidden
    }

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || target.username !== decoded.username) {
                return res.sendStatus(403);
            }
            // create accessToken
            const accessToken = jwt.sign(
                { "username": decoded.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            return res.status(200).json({ accessToken });
        }
    );
}

module.exports = { handleRefreshToken };