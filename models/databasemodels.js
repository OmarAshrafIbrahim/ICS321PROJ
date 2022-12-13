const sqlite3 = require("sqlite3");
const sqlite = require('sqlite')

const getDbConnection = async () => {
    return await sqlite.open({
        filename: 'deliveryDB.db',
        driver: sqlite3.Database
    })
};