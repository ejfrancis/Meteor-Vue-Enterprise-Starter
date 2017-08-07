// Inspired from: https://github.com/xolvio/qualityfaster/blob/master/.scripts/
const { exec } = require('child_process');

const meteorCommand = process.argv[2];
const chimpCommand = process.argv[3];

const meteorProcess = exec(meteorCommand); // 'npm start'

meteorProcess.stdout.pipe(process.stdout);
meteorProcess.stderr.pipe(process.stderr);

// Wait until Meteor is started and the start the chimp tests
meteorProcess.stdout.on('data', (data) => {
  if (data.toString().match('App running at')) {
    const chimpProcess = exec(chimpCommand); // 'npm run test:chimp:phantomjs'

    chimpProcess.stdout.pipe(process.stdout);
    chimpProcess.stderr.pipe(process.stderr);

    chimpProcess.on('close', (code) => {
      console.log(`Chimp exited with code ${code}`);
      meteorProcess.kill();
      process.exit(code);
    });
  }
});
