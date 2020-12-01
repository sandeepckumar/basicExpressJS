const fs = require("fs");
const path = require("path");

//returns a promise for reading the contents of dir
const readDir = (dir) => {
  return new Promise((res, rej) => {
    fs.readdir(dir, (err, files) => {
      if (err) rej(err);
      res(files);
    });
  });
};

//returns a promise for reading a file
const readFile = (fileName) => {
  return new Promise((res, rej) => {
    fs.readFile(fileName, (err, data) => {
      if (err) rej(err);
      res(data);
    });
  });
};

//returns a promise for writing a file
const writeFile = (fileName, data) => {
  return new Promise((res, rej) => {
    fs.writeFile(fileName, data, () => {
      console.log("The file is written");
    });
    res();
  });
};

//returns a promise for checking if a file exists
const fileAccess = (fileName) => {
  return new Promise((res, rej) => {
    fs.access(fileName, (err) => {
      if (err) {
        rej(err);
      } else {
        res(true);
      }
    });
  });
};

// returns a promise for append a file
const appendFile = (fileName, data) => {
  return new Promise((res, rej) => {
    fs.appendFile(fileName, data, (err) => {
      if (err) rej(err);
      res();
    });
  });
};

// returns a promise for deleting a file
const deleteFile = (fileName) => {
  return new Promise((res, rej) => {
    fs.unlink(fileName, (err) => {
      if (err) rej(err);
      res();
    });
  });
};

module.exports = {
  readDir,
  writeFile,
  fileAccess,
  readFile,
  appendFile,
  deleteFile,
};
