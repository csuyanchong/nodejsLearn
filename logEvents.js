const { format } = require('date-fns');
const uuid = require('uuid');

const fs = require('fs');
const path = require('path');

// console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'));

// console.log(uuid.v4());

const logEventsAsync = async (message) => {
   const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
   const logItem = `${dateTime}\t${uuid.v4()}\t${message}\n`;
   console.log(logItem);
   try {
      const dirLog = path.join(__dirname, 'logs');
      if (!fs.existsSync(dirLog)) {
         // create dir
         await fs.mkdirSync(dirLog);
      }
      const pathEventLog = path.join(dirLog, 'eventLog.txt');

      await fs.appendFileSync(pathEventLog, logItem);
   } catch (err) {
      console.error(err);
   }
};

module.exports = { logEventsAsync };