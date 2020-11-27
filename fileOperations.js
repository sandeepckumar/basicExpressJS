const fs = require("fs");
const path = require("path");

//returns promise for reading the contents of dir
const readDir = (dir) => {
    return new Promise((res, rej) => {
        fs.readdir(dir, (err, files) => {
            if (err) throw err;
            res(files)
        })
    })
}

//returns promise for reading a file
const readFile = (fileName) => {
    return new Promise((res, rej) => {
        let filePath = path.join(__dirname,"files",fileName)
        fs.readFile(filePath, (err, data) => {
            if (err) throw err;
            res(data)
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
}