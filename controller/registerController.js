const bcrypt = require('bcrypt');

const userDB = {
   users: require('../model/user.json'),
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
   const newUser = { "username": user, "password": pwd };
   userDB.setUsers([...userDB.users, newUser]);
   // TODO... 
}

