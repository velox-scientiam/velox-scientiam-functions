const fs = require('fs');
const path = `/${process.argv[2]}`;
const files = fs.readdirSync(__dirname + path);

const output = files
  .filter((f) => !f.includes('index.ts'))
  .map((f) => `export * from './${f.split('.ts')[0]}';`)
  .join('\n');

fs.writeFile(__dirname + `${path}/index.ts`, output, (e) => {
  if (e) {
    return console.log(e);
  }

  console.log('index file created for generated models');
});
