window.SkillQuestionOverView = Backbone.View.extend({
	initialize: function () {
		this.render();
	},
	render: function () {
		$(this.el).html(this.template(i18n));
		for (var i = 0; i < this.model.length; i++) {
			var question = new SkillQuestion();
			question.attributes = this.model[i];
			var skillQuestionView = new SkillQuestionView({model: question});
			$(".models", this.el).append(skillQuestionView.render().el);
		}
		return this;
	},
});
