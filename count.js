(function(){
    var request = new XMLHttpRequest();
    

    for (var month = 1; month <= 12;month++)
    {
        var so1 = 0, so2 = 0, so3 = 0, jung = 0, gang = 0, gi = 0;
        var memp = "";
        if (month < 10) memp = "0";
        for (var day = 1; day <= 31;day++)
        {
            var temp = "";
            if (day < 10) temp = "0";
            var url = "https://www.mss.go.kr/site/daegu/reservationFac/reservationFacListAjax.do?searchDate=2018-"+memp+month+"-"+temp+day+"&parent=1000000000000";
            request.open('GET',url, false);

            request.send();

            var obj = JSON.parse(request.responseText);

            

            for (var i = 0; i < obj.result.length; i++)
            {
                if (obj.result[i].conference_nm == "소회의실1") so1++;
                if (obj.result[i].conference_nm == "소회의실2") so2++;
                if (obj.result[i].conference_nm == "소회의실3") so3++;
                if (obj.result[i].conference_nm == "중회의실") jung++;
                if (obj.result[i].conference_nm == "강당") gang++;
                if (obj.result[i].conference_nm == "기업협력관 강의실") gi++;
            }
        }
        var sum = so1 + so2 + so3 + jung + gang + gi;
        console.log(so1+" "+so2+" "+so3+" "+jung+" "+gang+" "+gi + ": "+ sum);
    }
}());