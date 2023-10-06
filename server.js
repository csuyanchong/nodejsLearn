const express = require('express');
const app = express();

const cors = require('cors');
const corsOption = require('./config/corsOption');

const path = require('path');
const { logEventsAsync } = require('./logEvents');
const PORT = process.env.PORT || 3500;

const pathIndex = path.join(__dirname, 'views', 'index.html');
const path404 = path.join(__dirname, 'views', '404.html');
const pathPublic = path.join(__dirname, 'public');

// cross origin resource sharing
app.use(cors(corsOption));

// serve static files
app.use(express.static(pathPublic))

// log
app.use((req, res, next) => {
   logEventsAsync(req.origin, req.url, req.method);
   next();
});

app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

// api
app.use('/employees', require('./routes/api/employee'));
// app.use('/employee', require('routes/api/empoloyee'));

app.get('/', (req, res) => {
   logEventsAsync("请求", req.headers.origin, req.method);

   res.sendFile(pathIndex);
});

app.all('*', (req, res) => {
   res.status(404);
   if (req.accepts('html')) {
      res.sendFile(path404);
   }
   else if (req.accepts('json')) {
      res.json({ error: "404 Not Found" });
   }
   else {
      res.type('txt').send('404 Not Found');
   }

});

app.listen(PORT, () => {
   console.log(`Server is runing on port ${PORT}`);
});


const pattern = /s$/i;

const pattern2 = new RegExp("s$");

const pattern3 = /\\/;
