const fs = require('fs');
const path = require('path').join(__dirname, 'text.txt');
const stream = new fs.ReadStream(path, {encoding: 'utf-8'});

stream.on('readable', () => {
  const data = stream.read();
  stream.destroy();
  console.log(data);
})






