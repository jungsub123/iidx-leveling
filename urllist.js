(function(){
	var request = new XMLHttpRequest();
	var url = "https://p.eagate.573.jp/game/2dx/26/ranking/dani.html?page=0&play_style=0&grade_id=14&display=1";
	request.open('GET',url, false);

	request.send();

	var regExp0 = new RegExp('</?table>');
	var regExp1 = new RegExp('<div class="num"><a href=".{1,100}" target="_self">','g');
	var regExp2 = new RegExp('(<div class="num"><a href="|" target="_self">)','g');
	var output0 = request.responseText.split(regExp0);
	var output1 = output0[1].match(regExp1);
	var _8DList = new Array();


	var page = '/game/2dx/26/ranking/dani.html?page=0&play_style=0&grade_id=14&display=1';
	_8DList[0] = page;
	for(var i = 0; i < output1.length; i++)
	{
		page = output1[i].replace(regExp2,'');
		_8DList[i+1] = page;
	}

	console.log(_8DList.length);
	var result = "";

	for (var i = 0; i < _8DList.length;i++)
	{
		url = "https://p.eagate.573.jp/" + _8DList[i];
		request.open('GET',url,false);

		request.send();

		regExp0 = new RegExp('</?table>');
		output0 = request.responseText.split(regExp0);
		result += output0[3];
	}


	// var jsonInfo = JSON.stringify(_8DList);
	var link = document.createElement('a');
	link.setAttribute('download', 'result.txt');
	link.setAttribute('href', "data:text/json;charset=utf-8," + encodeURIComponent(result));
	link.click();
}());