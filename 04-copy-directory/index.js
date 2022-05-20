const { readdir, mkdir, copyFile, rm } = require('fs/promises');
const { COPYFILE_FICLONE } = require('fs').constants;

const path = require('path');
const srcDirPath = path.join(__dirname, 'files');
const destDirPath = path.join(__dirname, 'files-copy');

(async function() {
  try {
    await rm(destDirPath, {recursive: true, force: true});
    await copyDir(srcDirPath, destDirPath);
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
          await copyFile(srcPath, destPath, COPYFILE_FICLONE);
  }
}