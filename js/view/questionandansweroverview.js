App.View.QuestionAndAnswerOverView = Backbone.View.extend({
	initialize: function () {
		this.render();
	},
	render: function () {
		$(this.el).html(this.template(i18n));
		this.skillQuestion = new App.Model.SkillQuestion();
		this.skillQuestion.attributes = this.model;
		this.skillQuestionView = new App.View.SkillQuestionView({model: this.skillQuestion});
		$(".js-get-answers", this.skillQuestionView.el).hide();
		$("#skillquestion", this.el).append(this.skillQuestionView.el);
		var abstentionCount = 0;
		for (var i = 0; i < this.model.answers.length; i++) {
			if (this.model.answers[i].abstention) {
				abstentionCount++;
				continue;
			}
			var answer = new App.Model.Answer();
			answer.attributes = this.model.answers[i];
			var answerView = new App.View.AnswerView({model: answer});
			$('#answers', this.el).append(answerView.el);
		}
	},
});
