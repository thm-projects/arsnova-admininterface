var SessionService = function () {
	return {
		getSession: function (key, options) {
			$.ajax({
				url: "api/session/" + key,
				type: 'GET',
				success: options.success,
				error: function () {
					console.log("error fetching session via key: " + key);
					options.error()
				}
			});
		},
	}
};
