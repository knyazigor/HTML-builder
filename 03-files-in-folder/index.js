const { readdir } = require('fs/promises');
const { stat } = require('fs/promises');
const path = require('path');
const dirPath = path.join(__dirname, 'secret-folder');


(async function () {
  (await readdir(dirPath, {withFileTypes: true}))
    .filter(el => !el.isDirectory())
    .forEach(async (el) => {
      const [ name, extension ] = el.name.split('.');
      const filePath = path.join(dirPath, el.name);
      const { size } = await stat(filePath);
      console.log( `${name} - ${extension} - ${(size)} bytes`)
    })
})();
