const User = require('../model/User');
const bcrypt = require('bcrypt');
// const fs = require('fs');
const path = require('path');

const pathDB = path.join(__dirname, '..', 'model', 'user.json');

// const userDB = {
//    users: require(pathDB),
//    setUsers: function (val) {
//       this.users = val;
//    }
// };

const handleNewUser = async (req, res) => {
   const { user, pwd } = req.body;
   if (!user || !pwd) {
      // 处理用户名或者密码为空的情况
      return res.status(400).json({ 'message': 'Username and password are required.' });
   }

   const doubleData = await User.findOne({ username: user }).exec();
   if (doubleData) {
      // 重复注册
      return res.sendStatus(409);
   }

   // 插入操作
   const hashedPwd = await bcrypt.hash(pwd, 10);

   const result = await User.create({
      "username": user,
      "password": hashedPwd
   });

   console.log(result);

   res.status(201).json({ 'success': `New user ${user} created!` });
}

module.exports = { handleNewUser };

