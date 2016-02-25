window.LectureQuestion = Backbone.Model.extend({
	defaults: {
		_rev: "",
		abstention: "",
		active: "",
		duration: "",
		noCorrect: "",
		type: "",
		number: "",
		piRound: "",
		piRoundActive: "",
		piRoundStartTime: "",
		piRoundEndTime: "",
		piRoundFinished: "",
		votingDisabled: "",
		possibleAnswers: "",
		questionType: "",
		questionVariant: "",
		releasedFor: "",
		session: "",
		sessionId: "",
		sessionKeyword: "",
		showAnswer: "",
		showStatistic: "",
		subject: "",
		text: "",
		timestamp: "",
		type: "",
		gridSize: "",
		offsetX: "",
		offsetY: "",
		zoomLvl: "",
		image: "",
		fcImage: "",
		gridOffsetX: "",
		gridOffsetY: "",
		gridZoomLvl: "",
		gridSizeX: "",
		gridSizeY: "",
		gridIsHidden: "",
		imgRotation: "",
		toggleFieldsLeft: "",
		numClickableFields: "",
		thresholdCorrectAnswers: "",
		cvIsColored: "",
		gridLineColor: "",
		numberOfDots: "",
		gridType: "",
		scaleFactor: "",
		gridScaleFactor: "",
		imageQuestion: "",
		textAnswerEnabled: "",
		hint: "",
		solution: "",
	},
	initialize: function () {
	},
});
window.LectureQuestionCollection = Backbone.Collection.extend({
	fetch: function (key, options) {
		var me = this;
		$.ajax({
			url: "api/lecturerquestion/?lecturequestionsonly=true&sessionkey=" + key,
			type: 'GET',
			success: function (data) {
				me.models = data;
				options.success();
			},
			error: options.error
		});
	}
})
