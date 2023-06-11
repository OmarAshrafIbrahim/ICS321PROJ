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
    try {
        db.run(sql, [PNUMBER, Reciver_name, Type, status, destination, today]
        );
        await db.close();
    }
    catch (error) {
        alert("error")
        console.log(error)
    }
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
    const sql = `insert into Shipped_Package( weight,insurance_amount,dimensions, final_delivery_date, PNUMBER) values (?,?,?,?,?)`;
    const sql = `insert into Shipped_Package( weight,insurance_amount,dimensions, final_delivery_date, PNUMBER) values (?,?,?,?,?)`;
    try {
        db.run(sql, [wight, insurance_amount1, diaminsions, finaldeliverydate, PNUMBER], function (error) {
            if (error) {
                console.error(error.message);
            }
            console.log(`Inserted a shipped row with the PNUMBER: ${PNUMBER}`);
        }
        );
        await db.close();
    }
    catch (error) {
        console.log(error)
    }
};


async function findPackage(PNUMBER) {
    const db = await getDbConnection();
    const sql = `select PNUMBER from Package where PNUMBER = ?`;
    try {
        const res = await db.all(sql, [PNUMBER]);
        await db.close();
        return res;
    }
    catch (error) {
        console.log(error)
    }
    return res;
};
async function addUser(ID, Name, Goverment_ID, type, username, password) {
    const ID2 = ID;
    const db = await getDbConnection();
    if (type === 'customer ') {
        ID2 = Goverment_ID + '3';
    } else if (type === 'admin') {
        ID2 = Goverment_ID + '1';
    }
    else {
        ID2 = Goverment_ID + '2';
    }
    const sql = `insert into Person(ID, Name, Goverment_ID, type, username, password) values (?,?,?,?,?,?)`;
    try {
        db.run(sql, [ID2, Name, Goverment_ID, type, username, password], function (error) {
            if (error) {
                console.error(error.message);
            }
            console.log(`Inserted a shipped row with the PNUMBER: ${PNUMBER}`);
        }
        );
        await db.close();
    }
    catch (error) {
        console.log(error)
    }
};
async function RemoveUser(ID) {
    const db = await getDbConnection();
    const sql = `DELETE FROM Person WHERE ID = ?`;

    db.run(sql, [ID], function (error) {
    const sql = `insert into Person(ID, Name, Goverment_ID) values (?,?,?)`;
        db.run(sql, [ID, Name, Goverment_ID], function (error) {
        if (error) {
            console.error(error.message);
        }
        console.log(`Delete the user that has an ID : ${ID} From the Pearson Table`);
        console.log(`Inserted a row with the PNUMBER: ${PNUMBER}`);
    })
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
    const sql = `update Person SET  Name = ? ,Goverment_ID = ? where ID = ?`;
    try {
        db.run(sql, [ID, Goverment_ID, Name]);
        await db.close();

    }
    catch (error) {
        console.log(error)
    }
};
async function EditPackage(PNUMBER, Reciver_name, Type, status, destination) {
    const db = await getDbConnection();
    const sql = `update Package SET destination = ? ,Type= ?, status = ? ,receiver__name = ? where PNUMBER = ?`;
    try {
        db.run(sql, [Reciver_name, Type, status, destination, PNUMBER]);
        await db.close();
    }
    catch (error) {
        console.log(error)
    }
};

async function  FindUser (ID) {
    const db = await getDbConnection();
    const sql = `SELECT ID,Name,Goverment_ID FROM Person  where ID = ?`;
//     const result= await db.all(sql, [ID], function (error) {
//         if (error) {
//             console.error(error.message);
//         }
//         console.log(`Update the User Inforamation that has an ID : ${ID}`);
//     }
//     );
//     await db.close();
//     return result;
// };
try {
    const res = await db.all(sql, [ID]);
    await db.close();
    return res;
}
catch (error) {
    console.log(error)
}
return res;
};

async function EditUser(ID, Goverment_ID, Name, type, username, password) {
    const db = await getDbConnection();
    const sql = `update Person SET  Name = ? ,Goverment_ID = ?, type = ? ,username = ? ,password =? where ID = ?`;
    try {
        db.run(sql, [Name, Goverment_ID, type, username, password, ID]);
        await db.close();

    }
    catch (error) {
        console.log(error)
    }
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
async function Getpkgtyps(date1, date2) {
    const db = await getDbConnection();
    const sql = `select PNUMBER from package WHERE Type = 'Regular' AND datein between ? AND ? `;
    const sql2 = `select PNUMBER from package WHERE Type = 'Fragile' AND datein between ? AND ? `;
    const sql3 = `select PNUMBER from package WHERE Type = 'Liquid' AND datein between ? AND ?`;
    const sql4 = `select PNUMBER from package WHERE Type = 'Chemical'  AND datein between ? AND ?`;
    const count1 = await db.all(sql, date1, date2);
    const count2 = await db.all(sql2, date1, date2);
    const count3 = await db.all(sql3, date1, date2);
    const count4 = await db.all(sql4, date1, date2);
    const array = [count1, count2, count3, count4];
    const truearray = [array[0].length, array[1].length, array[2].length, array[3].length]
    await db.close();
    return truearray;
};

async function Gettrack3(categories, Status, destination) {

    const db = await getDbConnection();
    const sql = `select * from Package WHERE destination = ?  AND  Type = ? AND status = ?  `;
    const rows = await db.all(sql, [destination, categories, Status]);
    console.log(rows)
    await db.close();

    return rows;
};
async function login(username, password) {
    const db = await getDbConnection();
    const sql = `select type from Person WHERE username = ? AND password = ? `;
    const count1 = await db.all(sql, username, password);
    return (count1)

};
async function signup(Username, password, Goverment_ID, Name) {

    const db = await getDbConnection();
    const ID = Goverment_ID + '3';
    const type = 'customer'
    const sql = `insert into Person(ID, Name, Goverment_ID, type, username, password) values (?,?,?,?,?,?)`;
    try {
        db.run(sql, [ID, Name, Goverment_ID, type, Username, password], function (error) {
            if (error) {
                console.error(error.message);
            }
            console.log(`Inserted a shipped row with the PNUMBER: ${PNUMBER}`);
        }
        );
        await db.close();
    }
    catch (error) {
        console.log(error)
    }
};
async function trace(PNUMBER) {
    const db = await getDbConnection();
    const sql = `select location from Package_Location WHERE PNUMBER = ? `;
    try {
        const rows = await db.all(sql, [PNUMBER]);
        await db.close();
        const array = [PNUMBER, rows]
        return array
    }
    catch (error) {
        console.log(error)
    }
};
async function FindUser(ID) {
    const db = await getDbConnection();
    const sql = `SELECT ID,Name,Goverment_ID FROM Person  where ID = ?`;
    //     const result= await db.all(sql, [ID], function (error) {
    //         if (error) {
    //             console.error(error.message);
    //         }
    //         console.log(`Update the User Inforamation that has an ID : ${ID}`);
    //     }
    //     );
    //     await db.close();
    //     return result;
    // };
    try {
        const res = await db.all(sql, [ID]);
        await db.close();
        return res;
    }
    catch (error) {
        console.log(error)
    }
    return res;
};
module.exports = {
    addPackage,EditUser,FindUser,Getconfomedpaymnts, Getpkg2dates,
    addShippedPackage, RemovePackage, EditPackage, addUser,RemoveUser,
    addPackage,
    addShippedPackage, RemovePackage,
    EditPackage, addUser, Getconfomedpaymnts, Getpkg2dates, Getpkgtyps
    , Gettrack3, findPackage, login, signup, trace, RemoveUser, EditUser, FindUser
};


};