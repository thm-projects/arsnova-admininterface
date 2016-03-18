var AnswerService = function () {
	return {
		getAnswersForSkillQuestion: function (questionId, options) {
			$.ajax({
				url: "api/lecturerquestion/" + questionId + "/answer/?all=true",
				type: 'GET',
				success: options.success,
				error: function () {
					console.log("error fetching answers for skillquestion w/ id: " + questionId);
					options.error();
				}
			});
		},
	}
};
