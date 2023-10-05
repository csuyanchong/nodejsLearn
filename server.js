const http = require('http');
const path = require('path');
const fs = require('fs');

const logEvents = require('./logEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter {

};

// 初始化对象
const myEventEmitter = new Emitter();

const PORT = process.env.PORT || 3500;

const server = http.createServer((req, res) => {
   console.log(req.url, req.method);

   if (req.url === '/' || req.url === 'index.html') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end();
   }
});

server.listen(PORT, () => {
   console.log(`Server is runing on port ${PORT}`);
});
// myEventEmitter.on('log', (msg) => {
//    logEvents.logEventsAsync(msg);
//    // test
// });


// myEventEmitter.emit('log', 'event dispather!');

