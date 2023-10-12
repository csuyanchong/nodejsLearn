const User = require('../model/User');

const handleLogout = async (req, res) => {
    // 1.判断请求的cookie中是否有jwt，如果没有，直接返回成功204
    // 2.有jwt，判断jwt的refreshToken能否在数据库找到，如果不能，删除cookie，并返回成功204
    // 3.数据库找到了这个refreshToken对应的记录，修改该记录对应的refreshToken字段为空，并返回成功204
    let cookie = req.cookies;
    if (!cookie || !cookie.jwt) {
        return res.sendStatus(204);
    }

    let jwt = cookie.jwt;
    let target = await User.findOne({ refreshToken: jwt }).exec();
    if (!target) {
        // 没找到
        res.clearCookie('jwt', {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        return res.sendStatus(204);
    }

    target.refreshToken = '';
    await target.save();

    res.clearCookie('jwt', {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    });
    return res.sendStatus(204);
}

module.exports = { handleLogout };