const fs = require('fs');
const readLine = require('node:readline');

const process = require('node:process');

const path = require('path').join(__dirname, 'text.txt');

(async function () {
  const greetings = '\nWake up, Neo...\nThe Matrix has you...\nFollow the White Rabbit\n\n';
  console.log(greetings);

  const stream = fs.createWriteStream(path, 'utf-8');
  const rl = readLine.createInterface({ input: process.stdin, output: process.stdout, prompt: 'Your answer: ' });
  rl.on('close', () => {
    console.log(`\nAll lines have been written to ${path}`);
    stream.end();
    process.exit(0);
  }) 
  rl.prompt();
  let firstLine = true;
  for await (const line of rl) {
    switch (line.trim()) {
      case 'exit':
        rl.close();
        break;
      default:        
        stream.write((firstLine ? '' : '\n') + line);
        rl.prompt();
        if (firstLine) firstLine = false;
    }
  }
}
)();
