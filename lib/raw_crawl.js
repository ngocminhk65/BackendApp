const cheerio = require('cheerio');
const mysql = require('mysql');
//create conection for mysql
const getMangaEachCategory =() => {
    const connection = mysql.createConnection({
        "host": "localhost",
        "user":"root",
        "password":"password",
        "database":"develop"
    });
    // create simple sql query
    const queryAllCategory = `SELECT * FROM categorys`;
    // connect to mysql
    connection.connect(err => {
        if (err) {
            console.log(err);
            throw err;
        }
    });
    const category = [];

    connection.query(queryAllCategory, (err, result, fields) => {
        if (err) {
            console.log(err);
            throw err;
        }
        // console.log(result);
        for (let i = 0; i < result.length; i++) {
            category.push(result[i]);
        }
    });
    // query all category
    console.log(category);
    

}
getMangaEachCategory();

