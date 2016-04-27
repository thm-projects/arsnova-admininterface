App.View.UserSessionOverView = Backbone.View.extend({
	initialize: function () {
		this.render();
	},
	render: function () {
		console.log(this);
		/*$(this.el).html(this.template(i18n));
		for (var i = 0; i < this.model.length; i++) {
			var question = new App.Model.SkillQuestion();
			question.attributes = this.model[i];
			var skillQuestionView = new App.View.SkillQuestionView({model: question});
			$(".models", this.el).append(skillQuestionView.render().el);
		}*/
		return this;
	},
	asyncDataLoad: function () {
	}
});
