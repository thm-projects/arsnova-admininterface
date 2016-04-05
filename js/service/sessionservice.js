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
		export: function (key, options) {
			$.ajax({
				url: "api/session/export?sessionkey=" + key + "&withAnswerStatistics=true&withFeedbackQuestions=true",
				type: "GET",
				success: options.success,
				error: function () {
					console.log("error export session w/ key: " + key);
					options.error();
				}
			});
		},
		delete: function (key, options) {
			$.ajax({
				url: "api/session/" + key,
				type: "DELETE",
				success: options.success,
				error: function () {
					console.log("error deleting session w/ key: " + key);
					options.error();
				}
			});
		},
	}
};
