var mysql = require('mysql');
var fs = require('fs');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "iidx_stat"
});

var dan = 10;

con.connect(function (err) {
    var i;
    for (i = 2000; i < 3000; i++) {
        var allSongs = JSON.parse(fs.readFileSync(dan + '-' + i + '.json', 'utf8'));
        var usersql = "INSERT INTO User VALUES(?,?,?) ON DUPLICATE KEY UPDATE `Dani` = VALUES(`Dani`), `Ranking` = values(`Ranking`)";
    	var userparams = [allSongs[0].DJID, dan, i + 1];
    	con.query(usersql, userparams, function () {

        });
        allSongs.forEach(function (song) {
            var sql = "INSERT INTO playdata VALUES (?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE `Level` = VALUES(`Level`), `Rnk` = VALUES(`Rnk`), `Score` = VALUES(`Score`), `Lamp` = VALUES(`Lamp`)";
            var params = [song.DJID, song.Title, song.Difficulty, song.Level, song.Rank, song.Score, song.Lamp];
            con.query(sql, params, function () {

            });
        });
        console.log(i + " finish");
    }
    console.log("all finish");
});