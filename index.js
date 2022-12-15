const express = require("express");
const nunjucks = require("nunjucks");
const path = require('path');
const Model = require("./models/databasemodels")

const app = express();
const port = 8000;
app.use(express.urlencoded({ extended: true }))
nunjucks.configure("view", { express: app });
app.use(express.static("public"));
app.use(express.json());

app.get("/", async (req, res) => {
    res.render(path.join(__dirname + '/view/main.html'));
});
app.get("/admin/getpays", async (req, res) => {
    res.render(path.join(__dirname + '/view/getpays.html'));
});
app.get("/admin/pkg2dates", async (req, res) => {
    res.render(path.join(__dirname + '/view/pkg2dates.html'));
});
app.get("/admin/tyb2dates", async (req, res) => {
    res.render(path.join(__dirname + '/view/tyb2dates.html'));
});
app.get("/admin/track", async (req, res) => {
    res.render(path.join(__dirname + '/view/track.html'));
});
app.get("/admin/pkginfobycus", async (req, res) => {
    res.render(path.join(__dirname + '/view/pkginfobycus.html'));
});
app.get("/Employee", async (req, res) => {

    res.render(path.join(__dirname + '/view/Employee.html'));
});
app.get("/Customer", async (req, res) => {

    res.render(path.join(__dirname + '/view/Customer.html'));
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
app.get("/tracebackpackage", async (req, res) => {

    res.render(path.join(__dirname + '/view/traceback package.html'));
});


app.post('/addpackage', (req, res) => {

    Model.addPackage(req.body.PNUMBER, req.body.Reciver_name, req.body.Type, req.body.Status, req.body.destination)
    res.redirect('/admin')
    // res.render(path.join(__dirname + '/view/admin.html'));
});
app.post('/removepackage', (req, res) => {
    Model.RemovePackage(req.body.PNUMBER)
    res.redirect('/admin')
    // res.render(path.join(__dirname + '/view/admin.html'));
});
app.post('/Editpackage', (req, res) => {
    Model.EditPackage(req.body.PNUMBER, req.body.Reciver_name, req.body.Type, req.body.Status, req.body.destination)
    res.redirect('/admin')
    // res.render(path.join(__dirname + '/view/admin.html'));
});
app.post('/adduser', (req, res) => {
    Model.addUser(req.body.ID, req.body.Goverment_ID, req.body.Name)
    res.redirect('/admin')
    // res.render(path.join(__dirname + '/view/admin.html'));
});
app.post("/confomerdPaymnts", async (req, res) => {
    const arr = await Model.Getconfomedpaymnts(req.body.PNUMBER)
    res.render(path.join(__dirname + '/view/getpays.html'), { arr });
});
app.post('/pkg2dates', async (req, res) => {
    const arr = await Model.Getpkg2dates(req.body.date1, req.body.date2)
    res.render(path.join(__dirname + '/view/pkg2dates.html'), { arr });
});
app.post('/removeUser', (req, res) => {
    Model.RemoveUser(req.body.ID)
    res.redirect('/admin')
    // res.render(path.join(__dirname + '/view/admin.html'));
});
app.post('/editUser',async (req, res) => {
    Model.EditUser(req.body.ID)
    const arr = await Model.FindUser(req.body.ID)
    console.log(arr)
    // res.redirect('/admin/Edituser')
    // // res.render(path.join(__dirname + '/view/admin.html'));
    res.render(path.join(__dirname + '/view/Edit user.html'), { arr });
});
app.post('/FindUser',async(req, res) => {
    const arr = await Model.FindUser(req.body.ID)
    console.log(arr)
    // res.redirect('/admin/Edituser')
    // // res.render(path.join(__dirname + '/view/admin.html'));
    res.render(path.join(__dirname + '/view/Edit user.html'), { arr });
});
app.listen(port, function () {
    console.log(`Server listening on port http://127.0.0.1:${port}!`);
});