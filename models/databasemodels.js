const sqlite3 = require("sqlite3");
const sqlite = require('sqlite')

const getDbConnection = async () => {
    return await sqlite.open({
        filename: 'deliveryDB.db',
        driver: sqlite3.Database
    })
};
async function addPackage(PNUMBER, Reciver_name, Type, status, destination) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    const db = await getDbConnection();
    const sql = `insert into Package('PNUMBER', 'destination', 'Type','status','receiver__name','datein') values (?,?,?,?,?,?)`;

    db.run(sql, [PNUMBER, Reciver_name, Type, status, destination, today], function (error) {
        if (error) {
            console.error(error.message);
        }
        console.log(`Inserted a row with the PNUMBER: ${PNUMBER}`);
    }
    );
    await db.close();
};
async function RemovePackage(PNUMBER) {
    const db = await getDbConnection();
    const sql = `DELETE  FROM Package WHERE PNUMBER = ?`;

    db.run(sql, [PNUMBER], function (error) {
        if (error) {
            console.error(error.message);
        }
        console.log(`Inserted a row with the PNUMBER: ${PNUMBER}`);
    }
    );
    await db.close();
};
async function addShippedPackage(diaminsions, wight, finaldeliverydate, PNUMBER, price) {

    const db = await getDbConnection();
    const insurance_amount1 = price * .80;
    const sql = `insert into Shipped_Package( wight,insurance_amount,diaminsions, finaldeliverydate, PNUMBER) values (?,?,?,?,?)`;
    try {
        db.run(sql, [wight, insurance_amount1, diaminsions, finaldeliverydate, PNUMBER], function (error) {
            if (error) {
                console.error(error.message);
            }
            console.log(`Inserted a shipped row with the PNUMBER: ${PNUMBER}`);
        }
        );
        await sql.finalize()
        await db.close();
    }
    catch (error) {
        console.log(error)
    }
};

async function EditPackage(PNUMBER, Reciver_name, Type, status, destination) {
    const db = await getDbConnection();
    const sql = `update Package SET destination = ? ,Type= ?, status = ? ,receiver__name = ? where PNUMBER = ?`;

    db.run(sql, [Reciver_name, Type, status, destination, PNUMBER], function (error) {
        if (error) {
            console.error(error.message);
        }
        console.log(`Inserted a row with the PNUMBER: ${PNUMBER}`);
    }
    );
    await db.close();
};
async function addUser(ID, Goverment_ID, Name) {
    const db = await getDbConnection();
    const sql = `insert into Person(ID, Name, Goverment_ID) values (?,?,?)`;
    db.run(sql, [ID, Name, Goverment_ID], function (error) {
        if (error) {
            console.error(error.message);

        }
        console.log(`Inserted a row with the PNUMBER: ${PNUMBER}`);
    }
    );
    await db.close();
};
async function Getconfomedpaymnts() {
    const db = await getDbConnection();
    const sql = `select * from package WHERE status = 'Deliverd' `;
    const rows = await db.all(sql);
    await db.close();
    return rows;
};
async function Getpkg2dates(date1, date2) {
    const db = await getDbConnection();
    console.log(date1, date2)
    const sql = `select * from package WHERE datein between ? AND ? `;
    const rows = await db.all(sql, date1, date2);
    await db.close();
    return rows;
};


async function RemoveUser (ID) {
    const db = await getDbConnection();
    const sql = `DELETE FROM Person WHERE ID = ?`;

    db.run(sql, [ID], function (error) {
        if (error) {
            console.error(error.message);
        }
        console.log(`Delete the user that has an ID : ${ID} From the Pearson Table`);
    }
    );
    await db.close();
};
async function EditUser(ID, Goverment_ID, Name) {
    const db = await getDbConnection();
    const sql = `update Package SET  Name = ? ,Goverment_ID = ? where ID = ?`;

    db.run(sql, [ID, Goverment_ID, Name], function (error) {
        if (error) {
            console.error(error.message);
        }
        console.log(`Update the User Inforamation that has an ID : ${ID}`);
    }
    );
    await db.close();
};
async function  FindUser (ID) {
    const db = await getDbConnection();
    const sql = `SELECT ID,Name,Goverment_ID FROM Person  where ID = ?`;

    const result= await db.all(sql, [ID], function (error) {
        if (error) {
            console.error(error.message);
        }
        console.log(`Update the User Inforamation that has an ID : ${ID}`);
    }
    );
    await db.close();
    return result;
};
module.exports = {
    addPackage,
    addShippedPackage, RemovePackage, EditPackage, addUser

};