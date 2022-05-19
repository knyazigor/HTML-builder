const readdir = require('fs').promises.readdir;
const path = require('path').join(__dirname, 'secret-folder');
console.log(readdir(path));