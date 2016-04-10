var InterposedQuestionService = function () {
	return {
		getCount: function (sessionkey, options) {
			$.ajax({
				url: "api/audiencequestion/count?sessionkey=" + sessionkey,
				type: "GET",
				success: options.success,
				error: function () {
					console.log("error getting interposed question count for session w/ key " + sessionkey);
					options.error();
				}
			});
		},
	}
}
