const jwt = require('jsonwebtoken');
const User = require('../model/User');
const bcrypt = require('bcrypt');


const handleLogin = async (req, res) => {
   const { user, pwd } = req.body;
   if (!user || !pwd) {
      // 处理用户名或者密码为空的情况
      return res.status(401).json({ 'message': 'Username and password are required.' });
   }

   // 查找
   const target = await User.findOne({ username: user }).exec();;
   if (!target) {
      // 没找到
      return res.status(401).json({ 'message': `User ${user} not found!` });
   }

   // 评估密码
   let isSame = bcrypt.compareSync(pwd, target.password);
   if (isSame) {
      // jwts
      const accessToken = jwt.sign(
         { "username": target.username },
         process.env.ACCESS_TOKEN_SECRET,
         { expiresIn: '30s' }
      );
      const refreshToken = jwt.sign(
         { "username": target.username },
         process.env.REFRESH_TOKEN_SECRET,
         { expiresIn: '1d' }
      );

      // save refreshtoken into mongoDB database
      target.refreshToken = refreshToken;
      await target.save();

      res.cookie('jwt', refreshToken, {
         httpOnly: true,
         maxAge: 24 * 60 * 60 * 1000
      });
      return res.status(200).json({ accessToken });
   }
   else {
      // 密码不对
      return res.status(401).json({ 'message': `User ${user} wrong password!` });
   }
}

module.exports = { handleLogin };