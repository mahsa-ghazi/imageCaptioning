var mysql = require('mysql');

module.exports = {

    mysqlConn: (db) => {
        return new Promise ((resolve, reject) => {
            var con = mysql.createConnection({
                host     : process.env.DATABASE_HOST || '127.0.0.1',
                user     : 'root',
                password : 'shenasa123',
                database : 'image_captioning',
                port: 3306,
                insecureAuth: true
            });
            con.connect(function(err) {
            if 
                (err) reject(err);
            else 
                resolve(con);
            });
        });
    },

    query: (connection, sql) => {
        return new Promise((resolve, reject) => {
            connection.query(sql, function (err, result) {
                if (err) 
                    reject(err);
                else 
                    resolve(result);
              });

        });
    }
}