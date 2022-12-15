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
    res.render(path.join(__dirname + '/view/LorS.html'));
});
app.get("/login", async (req, res) => {
    res.render(path.join(__dirname + '/view/LOGIN.html'));
});
app.get("/signup", async (req, res) => {
    res.render(path.join(__dirname + '/view/signup.html'));
});
app.post("/login", async (req, res) => {
    const result = await Model.login(req.body.username, req.body.password);
    if (result[0].type === 'admin') {
        res.render(path.join(__dirname + '/view/admin.html'));
    } else if (result[0].type === 'customer') {
        res.render(path.join(__dirname + '/view/Customer.html'));
    } else if (result[0].type === 'employee') {
        res.render(path.join(__dirname + '/view/Employee.html'));
    }
    else {
        res.render(path.join(__dirname + '/view/signup.html'));
    }
});
app.post("/reg", async (req, res) => {
    Model.signup(req.body.Username, req.body.psw, req.body.GovermentID,
        req.body.Name);
    res.render(path.join(__dirname + '/view/LorS.html'));

});
app.get("/admin/getpays", async (req, res) => {
    res.render(path.join(__dirname + '/view/getpays.html'));
});
app.get("/admin/pkg2dates", async (req, res) => {
    res.render(path.join(__dirname + '/view/pkg2dates.html'));
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
app.get("/Addpackage", async (req, res) => {

    res.render(path.join(__dirname + '/view/Add package.html'));
});

app.get("/Admin", async (req, res) => {

    res.render(path.join(__dirname + '/view/admin.html'));
});

app.get("/Ship", async (req, res) => {

    res.render(path.join(__dirname + '/view/Ship.html'));
});
app.get("/addShipedPackage", async (req, res) => {

    res.render(path.join(__dirname + '/view/Add Shiped_package.html'));
});
app.get("/checkpakege", async (req, res) => {

    res.render(path.join(__dirname + '/view/check pakege.html'));
});
app.post('/addshipedpackage', (req, res) => {
    console.log(req.body)
    Model.addPackage(req.body.PNUMBER, req.body.Reciver_name, req.body.Type, req.body.Status, req.body.destination)
    Model.addShippedPackage(req.body.PNUMBER, req.body.wight, req.body.finaldeliverydate, req.body.diaminsions, req.body.price)
    res.redirect('/admin')
    // res.render(path.join(__dirname + '/view/admin.html'));
});

app.get("/admin/Removeuser", async (req, res) => {

    res.render(path.join(__dirname + '/view/Remove user.html'));
});

app.get("/Removepackage", async (req, res) => {

    res.render(path.join(__dirname + '/view/Remove package.html'));
});

// app.get("/Editpackage", async (req, res) => {

//     res.render(path.join(__dirname + '/view/Edit package.html'));
// });

app.get("/admin/Adduser", async (req, res) => {

    res.render(path.join(__dirname + '/view/Add user.html'));
});
app.get("/admin/Edituser", async (req, res) => {
    console.log('here1')
    res.render(path.join(__dirname + '/view/Edit user.html'));
});
app.get('/editUser2', async (req, res) => {
    Model.EditUser(req.body.ID, req.body.Goverment_ID, req.body.Name)
    res.render(path.join(__dirname + '/view/EditUser Form.html'));

});
app.post('/editUser2', async (req, res) => {
    console.log('here2')
    Model.EditUser(req.body.ID, req.body.Goverment_ID, req.body.Name, req.body.type, req.body.username, req.body.password)
    console.log(req.body)
    res.redirect('/admin')
});
app.post('/editUser', async (req, res) => {
    console.log('here3')

    const resu = await Model.FindUser(req.body.ID);
    console.log(resu)
    if (resu.length != 0) {
        res.render(path.join(__dirname + '/view/EditUser Form.html'), { resu });
    } else {
        res.redirect('/admin')
    }
});
app.post('/FindUser', async (req, res) => {
    const arr = await Model.FindUser(req.body.ID)
    console.log(arr)
    // res.redirect('/admin/Edituser')
    // // res.render(path.join(__dirname + '/view/admin.html'));
    res.render(path.join(__dirname + '/view/Edit user.html'), { arr });
});
app.get("/admin/Generatereports", async (req, res) => {

    res.render(path.join(__dirname + '/view/Generate reports.html'));
});
app.get("/admin/trace", async (req, res) => {

    res.render(path.join(__dirname + '/view/traceback package.html'));
});
app.get("/sendingemail", async (req, res) => {

    res.render(path.join(__dirname + '/view/sending email.html'));
});
app.get("/searchpackage", async (req, res) => {

    res.render(path.join(__dirname + '/view/search package.html'));
});
app.get("/addShipedPackage", async (req, res) => {

    res.render(path.join(__dirname + '/view/Add Shiped_package.html'));
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
app.post("/trace", async (req, res) => {
    const array = await Model.trace(req.body.PNUMBER)
    console.log(array)
    res.render(path.join(__dirname + '/view/traceback package.html'), { array });
});
app.post("/packeged", async (req, res) => {
    const array = await Model.addShippedPackage(req.body.diaminsions, req.body.wight, req.body.finaldeliverydate, req.body.PNUMBER, req.body.price)
    console.log(array)
    res.render(path.join(__dirname + '/view/Employee.html'), { array });
});
app.post('/addpackage', (req, res) => {
    Model.addPackage(req.body.PNUMBER, req.body.Reciver_name, req.body.Type, req.body.Status, req.body.destination);
    res.redirect('/admin')
    // res.render(path.join(__dirname + '/view/admin.html'));
});
app.post('/removepackage', (req, res) => {
    Model.RemovePackage(req.body.PNUMBER)
    res.redirect('/admin')
    // res.render(path.join(__dirname + '/view/admin.html'));
});
app.get('/Editpackage', async (req, res) => {

    // Model.EditPackage(req.body.PNUMBER, req.body.Reciver_name, req.body.Type, req.body.Status, req.body.destination)
    // res.redirect('/admin')
    res.render(path.join(__dirname + '/view/edit package.html'));
});
app.post('/Editpackage', async (req, res) => {
    const resu = await Model.findPackage(req.body.PNUMBER);
    console.log(resu)
    if (resu.length != 0) {
        res.render(path.join(__dirname + '/view/editpackage2.html'), { resu });
    } else {
        res.redirect('/admin')
    }
});
app.get('/Editpackage2', async (req, res) => {
    // const resu = await Model.findPackage(req.body.PNUMBER);
    Model.EditPackage(req.body.PNUMBER, req.body.Reciver_name, req.body.Type, req.body.Status, req.body.destination)
    res.render(path.join(__dirname + '/view/editpackage2.html'));

});
app.post('/Editpackage2', async (req, res) => {
    // const resu = await Model.findPackage(req.body.PNUMBER);
    Model.EditPackage(req.body.PNUMBER, req.body.Reciver_name, req.body.Type, req.body.Status, req.body.destination)
    res.redirect('/admin')
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
app.get("/admin/tyb2dates", async (req, res) => {
    res.render(path.join(__dirname + '/view/typeof2dates.html'));
});
app.post('/type2dates', async (req, res) => {
    const arr1 = await Model.Getpkgtyps(req.body.date1, req.body.date2)
    res.render(path.join(__dirname + '/view/typeof2dates.html'), { arr1 });
});
app.post('/tracepkgd', async (req, res) => {
    const arr2 = await Model.Gettrack3(req.body.categories, req.body.status, req.body.destination)
    res.render(path.join(__dirname + '/view/track.html'), { arr2 });
    // res.render(path.join(__dirname + '/view/typeof2dates.html'), { arr1 });
});

app.listen(port, function () {
    console.log(`Server listening on port http://127.0.0.1:${port}!`);
});