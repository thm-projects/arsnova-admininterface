window.LectureQuestionOverView = Backbone.View.extend({
	initialize: function () {
		this.render();
	},
	render: function () {
		var html = "";
		$(this.el).html(this.template());
		for (var i = 0; i < this.model.models.length; i++) {
			var question = new LectureQuestion();
			question.attributes = this.model.models[i];
			console.log(question.attributes);
			var lectureQuestionView = new LectureQuestionView({model: question});
			$(this.el).append(lectureQuestionView.render().el);
		}
		return this;
	},
});
