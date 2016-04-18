var InterposedQuestionService = function () {
	return {
		get: function (sessionkey, options) {
			$.ajax({
				url: "api/audiencequestion/?sessionkey=" + sessionkey,
				type: "GET",
				success: options.success,
				error: function () {
					console.log("error getting interposed questions for session w/ key " + sessionkey);
					options.error();
				}
			});
		},
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
		delete: function (id, options) {
			$.ajax({
				url: "api/audiencequestion/" + id,
				type: "DELETE",
				success: options.success,
				error: function () {
					console.log("error deleting interposed question w/ id: " + id);
				}
			});
		},
	}
}
