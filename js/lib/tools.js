var uu = '';
var vv = '';
function storePic(){
	var pic =  window.localStorage.getItem("pic");
		if (pic != undefined && pic != '' && pic != null) {
		var arr = pic.split(",");
		for (var i = 0; i < arr.length; i++) {
			var serverUrl = arr[i];
			serverUrl = serverUrl.replace(".jpg", ".base64");
			ajaxJson2(serverUrl);
		}
		if(uu.length>0){
			window.localStorage.setItem("temp_url", uu.substring(0, uu.length - 1));
		}
		if(vv.length>0){
			picToBase64();
	}
	}
}

function ajaxJson2(serverUrl) {
	vv += serverUrl + ',';
	temp = serverUrl.replace(".base64", ".jpg");
	uu += temp + ',';
	window.localStorage.setItem(temp, temp);
	
}

function picToBase64(){
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = toBase64Url+  vv.substring(0, vv.length - 1);
	var head = document.getElementsByTagName("head")[0];
	head.insertBefore(script, head.firstChild);
}
function json(data){
	//var start = new Date();
	temp = window.localStorage.getItem("temp_url");
	if(temp != null){
		var arr = temp.split(",");
		var key = '';
		for(var i = 0 ; i < arr.length ; i++){
			key = arr[i].replace("jpg","base64");
			if(window.localStorage.getItem(arr[i])!=null && window.localStorage.getItem(arr[i]) !=data[key]){
				window.localStorage.setItem(arr[i], data[key]);
				console.warn('success');
			}
		}
	}
	window.localStorage.removeItem("pic");
	window.localStorage.removeItem("temp_url");
	uu = '';
    vv = '';
}
