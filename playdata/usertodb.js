var mysql = require('mysql');
var fs = require('fs');

var dan = 8;

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "iidx_stat"
});

con.connect(function (err) {
    var allUsers = JSON.parse(fs.readFileSync(dan + 'userlist.json', 'utf8'));

    allUsers.forEach(function(user){
        var sql = "INSERT INTO User VALUES(?,?,?) ON DUPLICATE KEY UPDATE `Dani` = VALUES(`Dani`), `Ranking` = values(`Ranking`)";
        var params = [user.RivalID, user.Dani, user.Ranking];
        con.query(sql, params, function () {

        });
    });
});