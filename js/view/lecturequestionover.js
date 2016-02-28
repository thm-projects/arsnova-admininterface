window.LectureQuestionOverView = Backbone.View.extend({
	initialize: function () {
		this.render();
	},
	render: function () {
		$(this.el).html(this.template(i18n));
		for (var i = 0; i < this.model.length; i++) {
			var question = new SkillQuestion();
			question.attributes = this.model[i];
			var lectureQuestionView = new LectureQuestionView({model: question});
			$(this.el).append(lectureQuestionView.render().el);
		}
		return this;
	},
});
