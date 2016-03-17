var AnswerService = function () {
	return {
		getLectureQuestionsForSession: function (key, options) {
			$.ajax({
				url: "api/lecturerquestion/?lecturequestionsonly=true&requestImageData=true&sessionkey=" + key,
				type: 'GET',
				success: options.success,
				error: function () {
					console.log("error fetching lecture questions for sessionkey " + key);
					options.error();
				}
			});
		},
	}
};
