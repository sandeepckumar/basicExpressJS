const { constants } = require("buffer");
const fs = require("fs");
const { mainModule } = require("process");
const path = require("path")

const readDir = (dir) => {
    return new Promise((res, rej) => {
        fs.readdir(dir, (err, files) => {
            if (err)  res(err);
            res(files)
        })
    })
}

async function main () {
    let files= await readDir(path.join(__dirname, "filess"))
    console.log(files)
}

main()