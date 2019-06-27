var fs = require('fs');

var songlist = JSON.parse(fs.readFileSync('11diff3.json','utf8'));

var resarr = new Array();

var min = 100;
var max = 0;

for (song in songlist)
{
    if(songlist[song].Difficulty < min) min = songlist[song].Difficulty;
    if(songlist[song].Difficulty > max) max = songlist[song].Difficulty;
}

for (song in songlist)
{
    var resobj = new Object();
    resobj.Title2 = songlist[song].Title2;
    resobj.Difficulty = (songlist[song].Difficulty - min) * 100 / (max - min);

    resarr.push(resobj);
}

fs.writeFileSync('11diff3c.json',JSON.stringify(resarr));