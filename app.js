require("dotenv").config();
const express = require("express");
const app = express();
// const bodyParser = require('body-parser');
const userRouter = require('./api/users/user.router');

const port = process.env.APP_PORT


// app.use(bodyParser.json()); 
// for converting json object to javasript object
app.use(express.json());

/*change the name test to the table you inserting to:*/
app.use("/api/test", userRouter);

app.listen(port, () => {
    console.log("Server is up and running on port: " + port);
});








/* app.get("/api", (req, res) => {
    res.json({
        success: 1,
        message: "This is rest API working"
    });
}); */