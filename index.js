const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override"); 
app.use(methodOverride("_method")); 

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


let posts = [
    { id: uuidv4(), username: "sumiransingh100", content: "If you're new to coding, start with Python. It's like learning English compared to other programming languages — simple and easy to understand." },
    { id: uuidv4(), username: "prajjwal_bro", content: "Don't worry if your code doesn't work the first time. Even pro developers make mistakes — the key is to stay calm and fix it step by step." },
    { id: uuidv4(), username: "Tanmay_singh", content: "A slow computer doesn't always mean it's old. Sometimes, cleaning up unused apps and clearing your hard disk can make a big difference." },
];


app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    const { username, content } = req.body;
    let Id = uuidv4();
    posts.push({ id: Id, username, content });
    res.redirect("/posts");
});

app.get("/posts/:id", (req,res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;   
    posts = posts.filter((p) => p.id !== id);
    res.redirect("/posts");
});

app.listen(port, () => {
console.log("listening to port: 8080");
});

