const memwatch = require('@airbnb/node-memwatch');
const pretty = require('prettysize');

const memoryLogger = () => {
  console.log('loading memwatch')

  memwatch.on('leak', (info) => {
    console.error('Memory leak detected:\n', info)
    process.exit(1)
  });

  setInterval(()=>{
    console.log('Memory Usage:', pretty(process.memoryUsage().heapUsed))
  }, 500);
}


module.exports = { memoryLogger };
