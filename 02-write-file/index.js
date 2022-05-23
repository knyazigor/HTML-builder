const fs = require('fs');
const readLine = require('readline')
const process = require('node:process');

const path = require('path').join(__dirname, 'text.txt');
const stream = fs.createWriteStream(path, 'utf-8');

let greetings = '\nWake up, Neo...\nThe Matrix has you...\nFollow the White Rabbit\n\n';
console.log(greetings);

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Your answer: ',
})

rl.prompt();

rl.on('line', (line) => {
  switch (line.trim()) {
    case 'exit': 
      rl.close();
      break;
    default: 
      stream.write(line+'\n');
      rl.prompt();
      break;
  }
}).on('close', () => {
  stream.end();
  stream.on('finish', () => {
    console.log(`\nAll lines have been written to ${path}`);
  })
  setTimeout(() => {
    process.exit(0);
  }, 100);
})