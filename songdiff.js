var mysql = require('mysql');
var fs = require('fs');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "iidx_stat"
});

// var weight = 40;

// weight /= 100;

con.connect(function (err) {
    var userlist = JSON.parse(fs.readFileSync('userskill2.json','utf8'));
    var songlist = JSON.parse(fs.readFileSync('11diff2c.json','utf8'));
    var rescount = 0;
    var resarr = new Array();

    for (var song in songlist)
    {
        var sql = 'SELECT DJID FROM `Playdata` INNER JOIN `User` ON `User`.`RivalID` = `PlayData`.`DJID` WHERE `Title` = "' + songlist[song].Title2 + '" AND `Lamp` > 4 AND `Dani` = 9';
        // console.log(sql);
        con.query(sql, function(err, result){
            var diff = 0.0;
            var scorelist = new Array();
            // console.log(result);
            for (var i = 0; i < result.length; i++)
            {
                for (user in userlist)
                {
                    if(userlist[user].score != NaN)
                    {
                        if(userlist[user].RivalID == result[i].DJID)
                        {
                            scorelist.push(userlist[user].score);
                            break;
                        }
                    }
                }
            }
            scorelist.sort();
            for (var i = 0; i < scorelist.length; i++)
            {
                diff += scorelist[i];
            }
            diff /= scorelist.length;
            var resobj = new Object();
            resobj.Title2 = songlist[rescount].Title2;
            resobj.Difficulty = diff;
            resarr.push(resobj);
            console.log("["+rescount+"/"+songlist.length+"]"+songlist[rescount].Title2 + " : " + diff);
            rescount++;
            if(rescount == songlist.length) fs.writeFileSync('11diff3.json',JSON.stringify(resarr));
        });
    }
});