var fs = require('fs');
var mysql = require('mysql');

var client = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'iidx_stat'
});

var obj = JSON.parse(fs.readFileSync('urllist.json','utf8'));

client.connect(function(err) {
    if (err) throw err;
    else {
        // var sql = 'INSERT INTO URLs (dan,url) VALUES(?, ?)';
        // var params = [8, 'weraewrwaerwae'];
        // client.query(sql, params, function(err, rows, fields)
        // {
        //     if (err)    console.log(err);
        //     else    console.log(rows);
        // });
        for (var key in obj)
        {
            var sql = 'INSERT INTO URL (dan,address) VALUES(?, ?)';
            var params = [8, obj[key].url];
            client.query(sql, params, function(err, rows, fields)
            {
                if (err)    console.log(err);
                else    console.log(rows);
            });
        }
    }
  });