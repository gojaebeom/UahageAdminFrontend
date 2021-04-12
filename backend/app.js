"use strict"

// import module or third-part-lib ✨
require("dotenv").config();
const express = require("express");
const userRouter = require("./src/api/user/user.router");
const nurseryschoolRouter = require("./src/api/nurseryschool/ns.router");

// create express object and put into variable ✨
const app = express();

// set viewengine and middleware connecting ✨
// log setting if app mode is dev ✨
process.env.APP_MODE === "DEV" && app.use(require("morgan")("dev"));
app.set("view engine", "pug");
app.use(express.json());
app.use(express.urlencoded({
    limit: '150mb',
    extended: false,
}));

// Page router
app.get('/', (req, res, next) => {
    let createDom = `
    <html>
        <body>
            <form action="/nurseryschools" method="POST" enctype="multipart/form-data">
                <input type="file" name="xlsx" />
                <input type="submit" />
            </form>
        </body>
    </html>`;
    res.send(createDom);
});

// set router ✨
// Page router

// API router
app.use("/users", userRouter);
app.use("/nurseryschools", nurseryschoolRouter);

// export express app ✨
// this app used by ./bin/www.js
module.exports = app;