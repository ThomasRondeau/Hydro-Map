import mysql from 'mysql';
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'courtier'
});
connection.connect((err) => {
    if (err)
        throw err;
    console.log("connecté");
});
export default connection;
//# sourceMappingURL=DbConnection.js.map