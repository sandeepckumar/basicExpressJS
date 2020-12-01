const server = require("express");
const app = server();
const port = process.env.PORT || 8080;
const path = require("path");
const fileRouter = require("./routes/file.route");

app.use(server.json());
app.use("/file", fileRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Available routes",
    get: ["/file/show", "/file/read"],
    post: ["/file/write"],
    put: ["/file/append"],
    delete: ["/file/delete"],
  });
});

app.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});
