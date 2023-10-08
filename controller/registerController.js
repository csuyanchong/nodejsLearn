const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const pathDB = path.join(__dirname, '..', 'model', 'user.json');

const userDB = {
   users: require(pathDB),
   setUsers: function (val) {
      this.users = val;
   }
};


const handleNewUser = async (req, res) => {
   const { user, pwd } = req.body;
   if (!user || !pwd) {
      // 处理用户名或者密码为空的情况
      return res.status(400).json({ 'message': 'Username and password are required.' });
   }

   const doubleData = userDB.users.find((val) => val.username === user);
   if (doubleData) {
      // 重复注册
      return res.sendStatus(409);
   }

   // 插入操作
   const hashedPwd = await bcrypt.hash(pwd, 10);
   const newUser = { "username": user, "password": hashedPwd };
   userDB.setUsers([...userDB.users, newUser]);

   let resDB = JSON.stringify(userDB.users);
   // 写入文件
   await fs.writeFileSync(pathDB, resDB, 'utf-8');
   console.log(userDB.users);
   res.status(201).json({ 'success': `New user ${user} created!` });
}

module.exports = { handleNewUser };

