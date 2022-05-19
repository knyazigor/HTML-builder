const { readdir } = require('fs/promises');
const { stat } = require('fs/promises');
const path = require('path');
const dirPath = path.join(__dirname, 'secret-folder');


(async function () {
  (await readdir(dirPath, {withFileTypes: true}))
    .filter(el => !el.isDirectory())
    .forEach(async (el) => {
      const { name } = el;
      const filePath = path.join(dirPath, name);
      const { size } = await stat(filePath);
      console.log( `${name.split('.')[0]} - ${name.split('.')[1]} - ${(size)} bytes`)
    })
})();
