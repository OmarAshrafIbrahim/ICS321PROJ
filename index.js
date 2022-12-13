const express = require("express");
const nunjucks = require("nunjucks");
const path = require('path');
const Model = require("./models/databasemodels")

const app = express();
const port = 8000;

nunjucks.configure("view", { express: app });
app.use(express.json());
app.use(express.static("public"))

app.get("/", async (req, res) => {
    res.render(path.join(__dirname + '/view/main.html'));
});

app.get("/Employee", async (req, res) => {

    res.render(path.join(__dirname + '/view/Employee.html'));
});
app.get("/Addpackage", async (req, res) => {

    res.render(path.join(__dirname + '/view/Add package.html'));
});

app.get("/Admin", async (req, res) => {

    res.render(path.join(__dirname + '/view/admin.html'));
});

app.get("/Ship", async (req, res) => {

    res.render(path.join(__dirname + '/view/Ship.html'));
});

app.get("/adduser", async (req, res) => {

    res.render(path.join(__dirname + '/view/adduser.html'));
});

app.get("/Employee", async (req, res) => {

    res.render(path.join(__dirname + '/view/Employee.html'));
});

app.get("/Employee", async (req, res) => {

    res.render(path.join(__dirname + '/view/Employee.html'));
});

app.get("/Employee", async (req, res) => {

    res.render(path.join(__dirname + '/view/Employee.html'));
});

app.post('/Addpackage', function (req, res) {

    

    Model.addPackage(req.body.PNUMBER, 
        
        )
    res.render(path.join(__dirname + '/view/admin.html'));
});
app.listen(port, function () {
    console.log(`Server listening on port http://127.0.0.1:${port}!`);

});
