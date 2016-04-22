App.View.InterposedQuestionOverView = Backbone.View.extend({
	initialize: function () {
		this.render();
	},
	render: function () {
		$(this.el).html(this.template(i18n));
		for (var i = 0; i < this.model.length; i++) {
			var interposedQuestion = new App.Model.InterposedQuestion();
			interposedQuestion.attributes = this.model[i];
			var interposedQuestionView = new App.View.InterposedQuestionView({model: interposedQuestion});
			$(".models", this.el).append(interposedQuestionView.render().el);
		}
		return this;
	},
});
