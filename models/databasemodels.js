const sqlite3 = require("sqlite3");
const sqlite = require('sqlite')

const getDbConnection = async () => {
    return await sqlite.open({
        filename: 'deliveryDB.db',
        driver: sqlite3.Database
    })
};
async function addPackage(PNUMBER, Reciver_name, Type, status, destination) {
    const db = await getDbConnection();
    const sql = `insert into Package('PNUMBER', 'destination', 'Type','status','receiver__name') values (?,?,?,?,?)`;

    db.run(sql, [PNUMBER, Reciver_name, Type, status, destination], function (error) {
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

    db.run(sql, [wight, insurance_amount1, diaminsions, finaldeliverydate, PNUMBER], function (error) {
        if (error) {
            console.error(error.message);
        }
        console.log(`Inserted a shipped row with the PNUMBER: ${PNUMBER}`);
    }
    );
    await sql.finalize()
    await db.close();
};


module.exports = {
    addPackage,
    addShippedPackage,

};