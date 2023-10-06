const whitelist = [
   'https://www.mywebsite.com',
   'http://127.0.0.1:5500',
   'http://localhost:3500',
   'http://localhost'
];

const corsOption = {
   origin: (origin, callback) => {
      if (whitelist.indexOf(origin) != -1 || !origin) {
         callback(null, true);
      }
      else {
         callback(new Error('Not allowed by CORS!'));
      }
   },
   optionsSuccessStatus: 200
};

module.exports = corsOption;