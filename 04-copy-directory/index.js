const { readdir, mkdir, copyFile } = require('fs/promises');
const { COPYFILE_FICLONE } = require('fs').constants;

const path = require('path');
const srcDirPath = path.join(__dirname, 'files');
const destDirPath = path.join(__dirname, 'files-copy');

(async function() {
  try {
    const files = await readdir(srcDirPath);
    await mkdir(destDirPath, {recursive: true});
    files.forEach(async (file) => {    
        await copyFile(path.join(srcDirPath, file), path.join(destDirPath, file), COPYFILE_FICLONE)
    });
  }
  catch (err) {
    console.log(err);
  }
})();
