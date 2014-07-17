var userDMListPage = 1;
var userDMListListCacheName = "userDMListListCacheName";
var listLastPageData = "";
$(document).ready(function() {
    setTimeout(function(){
        refreshUserDMListData();
    },2000)

    });
function refreshUserDMListData() {
	ajaxRequest(userDMListListCacheName, userDmUrl, "condition.curPage=" + userDMListPage + "&condition.fetchNum=7", userDMListSuccess, userDMListError,null,true);
}
function userDMListSuccess() {
    var returnData = str2obj(window.localStorage.getItem(userDMListListCacheName));
    var data = returnData.data;
    var resultList = data.pageList;
    var msgHtml='';
    for (var i = 0; i < resultList.length; i++) {
        if (resultList[i].dmInfo == undefined) {
            continue;
        }
        var dmId = resultList[i].dmInfo.id;
        var uri = resultList[i].dmInfo.uri;
        var title = resultList[i].dmInfo.title;
        var startTime = resultList[i].dmInfo.startTime;
        var endTime = resultList[i].dmInfo.endTime;
        var dmTimeStatus = resultList[i].dmInfo.dmTimeStatus;
        var isRead = resultList[i].isRead;
        var pictureUrl = resultList[i].dmInfo.pictureUrl;
        pictureUrl = pictureUrl.replace("/b/", "/s/");
        msgHtml+='<div class="touchBox"><ul class="innerBox"><li><div><img height="70" width="70"src="'+pictureUrl+'"></div><div class="message-info"><p>'+title+'</p><p>'+startTime+'</p><p>'+endTime+'</p></div></li><li class="delete"><i class="fa fa-minus-circle fa-2x red-color"></i></li></ul></div>';
    }
    $("#datalist").html(msgHtml);
    myScroll.refresh();
    $(".delete").on("tap", function () {
        $(this).parents(".touchBox").remove();
        $(".touchBox").Swipe(args);
        myScroll.refresh();
    });
    $(".touchBox").Swipe(args);
}

function userDMListError() {
	//TODO
}
