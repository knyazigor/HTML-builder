const fs = require('fs');
const process = require('node:process');

const path = require('path').join(__dirname, 'text.txt');
const stream = fs.createReadStream(path, 'utf-8');

stream.on('data', (chunk) => process.stdout.write(chunk));

