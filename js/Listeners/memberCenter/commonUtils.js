$(".input-info").unbind('focus').bind('focus', function(event) {
	if (isNull()) {
		$("#disable").show();
		$("#able").hide();
	} else {
		$("#disable").hide();
		$("#able").show();
	}
});
$(".input-info").unbind('keydown').bind('keydown', function(event) {
	if (isNull()) {
		$("#disable").show();
		$("#able").hide();
	} else {
		$("#disable").hide();
		$("#able").show();
	}
});
$(".input-info").unbind('click').bind('click', function(event) {
	if (isNull()) {
		$("#disable").show();
		$("#able").hide();
	} else {
		$("#disable").hide();
		$("#able").show();
	}
});
$(".input-info").unbind('keyup').bind('keyup', function(event) {
	if (isNull()) {
		$("#disable").show();
		$("#able").hide();
	} else {
		$("#disable").hide();
		$("#able").show();
	}
}); 