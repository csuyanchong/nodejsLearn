const express = require('express');
const app = express();

const cors = require('cors');

const path = require('path');
const { logEventsAsync } = require('./logEvents');
const PORT = process.env.PORT || 3500;

const pathIndex = path.join(__dirname, 'views', 'index.html');
const pathPublic = path.join(__dirname, 'public');

// cross origin resource sharing
const whitelist = ['https://www.mywebsite.com', 'http://127.0.0.1:5500', 'http://localhost:3500'];
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

app.use(cors(corsOption));

app.use(express.static(pathPublic))

app.get('/', (req, res) => {
   logEventsAsync("请求", req.headers.origin, req.method);

   res.sendFile(pathIndex);
});

app.listen(PORT, () => {
   console.log(`Server is runing on port ${PORT}`);
});


const pattern = /s$/i;

const pattern2 = new RegExp("s$");

const pattern3 = /\\/;
