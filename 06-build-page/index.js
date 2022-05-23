const { readdir, mkdir, copyFile, rm, readFile, writeFile } = require('fs/promises');
const { COPYFILE_FICLONE } = require('fs').constants;
const path = require('path');

(async function () {
  try {
    //make directory
    const destDirPath = path.join(__dirname, 'project-dist');  
    await rm(destDirPath, {recursive: true, force: true});
    await mkdir(destDirPath, {recursive: true});
    //insert components
    const componentsPath = path.join(__dirname, 'components')  
    const components = (await readdir(componentsPath, {withFileTypes: true}))
      .filter(el => !el.isDirectory() && path.extname(el.name).toLowerCase() === '.html')
      .map(el => el.name);
    let template = await readFile(path.join(__dirname, 'template.html'), 'utf-8');
    for (const component of components) {
      const re = new RegExp(`{{${component.replace(/\.[^/.]+$/, '')}}}`, 'g');
      const data = await readFile(path.join(componentsPath, component), 'utf-8');
      template = template.replace(re, data);    
    }
    await writeFile(path.join(destDirPath, 'index.html'), template, 'utf-8');
    //merge styles
    const stylesPath = path.join(__dirname, 'styles');
    const styles = (await readdir(stylesPath, {withFileTypes: true}));
    const stylesBundle = (await Promise.all(
        styles.map(el => readFile(path.join(stylesPath, el.name), 'utf-8'
      )))).reverse().reduce((acc, el) => acc + el, '');
    await writeFile(path.join(destDirPath, 'style.css'), stylesBundle, 'utf-8');
    //copy assets 
    const asssetsDest = path.join(destDirPath, 'assets');
    const assetsSrc = path.join(__dirname, 'assets');
    await copyDir(assetsSrc, asssetsDest);
  }
  catch (err) {
    console.log(err);
  }
  
})();

async function copyDir(src, dest) {
  await mkdir(dest, { recursive: true });
  let entries = await readdir(src, { withFileTypes: true });

  for (let entry of entries) {
      let srcPath = path.join(src, entry.name);
      let destPath = path.join(dest, entry.name);

      entry.isDirectory() ?
          await copyDir(srcPath, destPath) :
          await copyFile(srcPath, destPath);
  }
}