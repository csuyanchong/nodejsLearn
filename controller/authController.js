const bcrypt = require('bcrypt');
const path = require('path');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const fs = require('fs');

const pathDB = path.join(__dirname, '..', 'model', 'user.json');

const userDB = {
   users: require(pathDB),
   setUsers: function (val) {
      this.users = val;
   }
};


const handleLogin = async (req, res) => {
   const { user, pwd } = req.body;
   if (!user || !pwd) {
      // 处理用户名或者密码为空的情况
      return res.status(401).json({ 'message': 'Username and password are required.' });
   }

   // 查找
   const target = userDB.users.find((val) => val.username === user);
   if (!target) {
      // 没找到
      return res.status(401).json({ 'message': `User ${user} not found!` });
   }

   // 评估密码
   let isSame = bcrypt.compareSync(pwd, target.password);
   if (isSame) {
      return res.status(200).json({ 'success': `User ${user} is logged in!` });
   }
   else {
      // 密码不对
      return res.status(401).json({ 'message': `User ${user} wrong password!` });
   }
}

module.exports = { handleLogin };