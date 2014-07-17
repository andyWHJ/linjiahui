function login() {
	var userName = trim($("#login-username").val());
	var password = trim($("#login-password").val());
	refreshLoginData(userName, password);
}

function refreshLoginData(userName, password) {
	ajaxRequest("login", loginUrl,"account=" + userName + "&password=" + password, loginSuccess, loginError,null,false);
}

function loginSuccess() {
	var returnData = str2obj(window.localStorage.getItem("login"));
	if (returnData.status == 0) {
		var data = returnData.data;	
		var token = data.token;
		var userId = data.userId;
		var isMember = data.isMember;
		window.localStorage.setItem("checkStr",token)
		window.localStorage.setItem("loginUserId",userId)
		window.localStorage.setItem("isMember",isMember)

        $("#login-content").animate({
            translate3d: '1000px,0,0'
        }, "slow", "ease-in-out");
        $("#member-content").animate({
            translate3d: '0,0,0'
        }, "slow", "ease-in-out",function(){
            $(this).get(0).style.removeProperty('height');
            myScroll.refresh()
        });
        refreshUserCardData();
	} else if (returnData.status == 5003) {

	}
}

function loginError() {
	//TODO
}
$("#login-submit").on("tap",function(){
    login();
})

