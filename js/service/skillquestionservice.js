var SkillQuestionService = function () {
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
		getPreparationQuestionsForSession: function (key, options) {
			$.ajax({
				url: "api/lecturerquestion/?preparationquestionsonly=true&requestImageData=true&sessionkey=" + key,
				type: 'GET',
				success: options.success,
				error: function () {
					console.log("error fetching lecture questions for sessionkey " + key);
					options.error();
				}
			});
		},
		deleteSkillQuestion: function (questionId, options) {
			$.ajax({
				url: "api/lecturerquestion/" + questionId,
				type: "DELETE",
				success: options.success,
				error: function () {
					console.log("error deleting skill question");
					options.error();
				}
			});
		},
	}
};
