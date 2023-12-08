//Cleans the dist directory before building
const fs = require('fs');
const path = require('path');

const directory = 'dist';

fs.rm(path.join(__dirname, directory), { recursive: true, force: true }, (err) => {
  if (err && err.code !== 'ENOENT') { // Ignore error if directory doesn't exist
    console.error(`Error while deleting ${directory} directory:`, err);
  }
});
