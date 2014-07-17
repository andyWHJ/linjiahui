/**
 * 向服务器发起跨域请求
 */

function ajaxJson(name, action, reqData, success) {
	var name = name;
	var url = action + reqData;
	console.log(url);
	var json;

	var callbackparam = function(json) {
		window.localStorage.setItem(name, obj2str(json));
		console.log("json")
		success();
	};
	$.ajax({
		type : "POST",
		async : false,
		url : url,
		dataType : "jsonp",
		jsonp : "callbackparam", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
		success : function(json) {
            try{
                console.log(json)
                callbackparam(json)
            }catch(e){
                console.log(e)
            }

		},
		error : function(){

		}
	});

}
