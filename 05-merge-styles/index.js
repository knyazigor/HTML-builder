const { readdir, readFile, writeFile } = require('fs/promises');
const path = require('path');

(async function() {
  try {
    const stylesPath = path.join(__dirname, 'styles');
    const data = (await Promise.all((await readdir(stylesPath, {withFileTypes: true}))
        .filter(el => !el.isDirectory() && el.name.substring(el.name.length - 3) === 'css')
        .map(el => readFile(path.join(stylesPath, el.name), 'utf-8'))))
      .reduce((acc, el) => acc + el, '');

    const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');
    await writeFile(bundlePath, data, 'utf-8');
  }
  
  catch (err) {
    console.log(err);
  }
})();
