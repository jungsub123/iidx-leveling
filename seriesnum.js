var mysql = require('mysql');
var fs = require('fs');

var client = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'iidx_stat'
});

var qry = "select count(*) from music group by ver order by ver";

client.query(qry, function(error, result, fields) {
    if(error)   console.log(result);
    else
    {
        var nums = new Array();
        for (var data in result)
        {
            nums.push(result[data]['count(*)']);
        }
        var json = JSON.stringify(nums);
        fs.writeFileSync('series.json', json, 'utf8');
    }
});