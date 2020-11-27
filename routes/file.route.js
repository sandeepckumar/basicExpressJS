const express = require("express");
const router = express.Router();
const path = require("path");
const { readDir, writeFile, fileAccess, readFile, appendFile, deleteFile } = require("../promisifiedFs/fileIO");

router.get("/show", async (req, res) => {
    let dirPath = path.resolve("files");
    try
    {
        var files = await readDir(dirPath);
        res.status(200).json({ "Show available files": files });
    } catch (err)
    {
        res.status(503).json({ error: "Error reading DIR" });
    }
})

router.get("/read/:fileName", async (req, res) => {
    let fileName = req.params['fileName'];
    try
    {
        let filePath = path.resolve(`files/${fileName}`);
        await fileAccess(filePath);
        let data = await readFile(filePath);
        res.status(200).send(data);
    } catch (err)
    {
        res.status(401).send(`Error: ${err}`);
    }  
   
})

router.post("/write", async (req, res) => {
    if (req.body.name && req.body.data)
    {
        try
        {
            let fileName = path.resolve(`files/${req.body.name}`);
            await writeFile(fileName, req.body.data);
            res.status(201).send(`File ${req.body.name} has been created. Use "GET" on /file/readFile/${req.body.name} to read the file contents.`);
        } catch (err)
        {
            res.status(500).send(`Error occured:\n ${err}`);
        }
        
    } else
    {
        res.status(401).send("Please send body in the following manner:\n{\n'name':'Enter name of the file',\n'data':'Enter data to be written to the file'\n} ");
    }
})

router.put("/append", async (req, res) => {

    if (req.body.name && req.body.data)
    {
        try
        {
            let fileName = path.resolve(`files/${req.body.name}`);
            await fileAccess(fileName);
            await appendFile(fileName, req.body.data);
            res.status(201).send(`The file has been updated. Use "GET" on /file/readFile/${req.body.name} to read the file contents.`);

        } catch (err)
        {
            res.send(`Error Occured:\n ${err}`);
        }
    } else
    {
        res.status(401).send("Please send body in the following manner:\n{\n'name':'Enter name of the file',\n'data':'Enter data to be written to the file'\n} ");
    }
})

router.delete("/delete", async (req, res) => {
    if (req.body.name)
    {
        try
        {
            let fileName = path.resolve(`files/${req.body.name}`);
            await fileAccess(fileName);
            await deleteFile(fileName);
            res.status(201).send(`The file "${req.body.name}" is delete. Use "GET" on /file/show to see available files.`);

        } catch (err)
        {
            res.status(401).send(`Error Occured:\n${err}`);
        }
    } else
    {
        res.status(401).send("Please send body in the following manner:\n\n{\n'name':'Enter name of the file',\n'} ");
    }
    
})

module.exports = router;