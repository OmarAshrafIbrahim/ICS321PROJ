const express = require("express");
const nunjucks = require("nunjucks");
const path = require('path');
const Model = require("./models/databasemodels")

const app = express();
const port = 8000;

nunjucks.configure("view", { express: app });
app.use(express.static("public"));
app.use(express.json());

app.get("/", async (req, res) => {
    res.render(path.join(__dirname + '/view/main.html'));
});

app.get("/Employee", async (req, res) => {

    res.render(path.join(__dirname + '/view/Employee.html'));
});
app.get("/Customer", async (req, res) => {

    res.render(path.join(__dirname + '/view/Customer.html'));
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

app.get("/admin/Removeuser", async (req, res) => {

    res.render(path.join(__dirname + '/view/Remove user.html'));
});

app.get("/Removepackage", async (req, res) => {

    res.render(path.join(__dirname + '/view/Remove package.html'));
});

app.get("/Editpackage", async (req, res) => {

    res.render(path.join(__dirname + '/view/Edit package.html'));
});

app.get("/admin/Adduser", async (req, res) => {

    res.render(path.join(__dirname + '/view/Add user.html'));
});
app.get("/admin/Edituser", async (req, res) => {

    res.render(path.join(__dirname + '/view/Edit user.html'));
});
app.get("/admin/Generatereports", async (req, res) => {

    res.render(path.join(__dirname + '/view/Generate reports.html'));
});
app.get("/admin/trace", async (req, res) => {

    res.render(path.join(__dirname + '/view/trace.html'));
});
app.get("/sendingemail", async (req, res) => {

    res.render(path.join(__dirname + '/view/sending email.html'));
});
app.get("/searchpackage", async (req, res) => {

    res.render(path.join(__dirname + '/view/search package.html'));
});
app.get("/send", async (req, res) => {

    res.render(path.join(__dirname + '/view/send.html'));
});
app.get("/revceive", async (req, res) => {

    res.render(path.join(__dirname + '/view/revceive.html'));
});
app.get("/updatepersonal", async (req, res) => {

    res.render(path.join(__dirname + '/view/update personal.html'));
});
app.get("/dopayment", async (req, res) => {

    res.render(path.join(__dirname + '/view/do payment.html'));
});
app.get("/tracebackpackage", async (req, res) => {

    res.render(path.join(__dirname + '/view/traceback package.html'));
});


app.listen(port, function () {
    console.log(`Server listening on port http://127.0.0.1:${port}!`);
});