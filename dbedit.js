// ALTER TABLE Customers
// ADD Email varchar(255);
const sqlite3 = require("sqlite3");
const sqlite = require('sqlite')

const getDbConnection = async () => {
    return await sqlite.open({
        filename: 'deliveryDB.db',
        driver: sqlite3.Database
    })
};
async function newcolumn() {
    const db = await getDbConnection();
    const sql = `ALTER TABLE Customer ADD payment varchar(255)`;

    db.run(sql, function (error) {
        if (error) {
            console.error(error.message);
        }
    }
    );
    await db.close();
}; newcolumn()