const fs = require("fs");
const path = require("path");


//returns promise for reading the contents of dir
const readDir = (dir) => {
    return new Promise((res, rej) => {
        fs.readdir(dir, (err, files) => {
            if (err) rej(err);
            res(files)
        })
    })
}

//returns promise for reading a file
const readFile = (fileName) => {
    return new Promise((res, rej) => {
        let filePath = path.join(__dirname,"files",fileName)
        fs.readFile(filePath, (err, data) => {
            if (err) rej(err);
            res(data)
        })
    })
}

//returns promise for writing a file
const writeFile = (FileName) => {
    return new Promise((res, rej) => {
        fs.writeFile(fileName, data, () => {
            console.log("The file is written")
        })
    })
}

//return promise for checking if a file exists
const fileAccess = (fileName) => {
    return new Promise((res, rej) => {
        let filePath = path.join(__dirname, "files", fileName)
        fs.access(filePath, (err) => {
            if (err)
            {
                rej(err)
            } else
            {
                res(true)
            }
        })
    })
};


module.exports = {readDir,writeFile, fileAccess, readFile}