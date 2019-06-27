var mysql = require('mysql');
var fs = require('fs');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "iidx_stat"
});

con.connect(function (err) {
    var songdiff = JSON.parse(fs.readFileSync('11diff2c.json', 'utf8'));
    var userlist = JSON.parse(fs.readFileSync('9user.json', 'utf8'));
    var resarr = new Array();

    var rescount = 0;

    for (var user in userlist)
    {
        //console.log(userlist[user].RivalID);
    
        var sql = "SELECT Title, Lamp FROM Playdata WHERE DJID = " + userlist[user].RivalID + " AND Lamp > 4";
        con.query(sql, function(err, result){
            var count = 0;
            var score = 0.0;
            var clearlist = new Array();
            // console.log(result);
            if(result.length >= 10)
            {
                for (var i = 0; i < result.length; i++)
                {
                    for (var song in songdiff)
                    {
                        if(result[i].Title == songdiff[song].Title2)
                        {
                            clearlist.push(songdiff[song].Difficulty);
                        }
                    }
                }
                clearlist.sort(function (a, b){
                    return b - a;
                });

                for (var i = 0; i < 10; i++)
                {
                    score += clearlist[i];
                }

                score /= 10;
                var resobj = new Object();
                resobj.RivalID = userlist[rescount].RivalID;
                resobj.score = score;
                resarr.push(resobj);
                console.log("[" + rescount + "/" + userlist.length + "] " + userlist[rescount].RivalID + " : " + score);
            }
            rescount++;
            if(rescount == userlist.length)  fs.writeFileSync('userskill2.json', JSON.stringify(resarr));
        });
    }
});
