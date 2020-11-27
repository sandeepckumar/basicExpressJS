const server = require("express");
const app = server();
const port = process.env.PORT || 8080;
const { readDir, writeFile, fileAccess, readFile } = require("./fileIO")
const path = require("path");



app.use(server.json())

// const { fileAccess } = require("./fileIO")

app.get("/", (req, res) => {
    res.status(200).json({ msg: 'Available routes', get: ["showFiles", "readFile"], post: ["writeFile"], put: ["appendFile"], delete: ["deleteFiles"]});
})

app.get("/showFiles", async (req, res) => {
    let dirPath = path.join(__dirname, "files")
    try
    {
    var files = await readDir(dirPath)
    console.log(files)
    res.status(200).json({"Show all files in DIR": files})
    } catch (err)
    {
        console.error(err)
        res.status(503).json({error:"Error reading DIR"})
    }
})

app.get("/readFile/:fileName", async (req, res) => {
    let fileName = req.params['fileName']
    try
    {
        let fileExists = await fileAccess(fileName)
        let data = await readFile(fileName)
        res.status(200).send(data)

    } catch (err)
    {
        console.error(err)
        res.status(401).send(`Error: ${err}`)
    }  
   
})

app.post("/writeFile", async (req, res) => {
    console.log(req.body)
    if (req.body.name && req.body.data)
    {
        try
        {
            await writeFile(req.body.name, req.body.data)
            res.status(201).send(`File ${req.body.name} has been created. Use "GET" on /readFile/{name_of_file} to read the file.`)
        } catch (err)
        {
            res.status(500).send(`Error occured:\n ${err}`)
        }
        
    } else
    {
        res.status(401).send("Please send body in the following manner:\n{\n'name':'Enter name of the file',\n'data':'Enter data to be written to the file'\n} ")
    }
})

app.listen(port, () => { 
    console.log(`Server Started on port ${port}`);
});

// to-do create a repo on github and push.