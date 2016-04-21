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
		deleteAnswer: function (questionId, answerId, options) {
			$.ajax({
				url: "api/lecturerquestion/" + questionId + "/answer/" + answerId,
				type: "DELETE",
				success: options.success,
				error: function () {
					console.log("error deleting answer");
					options.error();
				}
			});
		},
	};
};
