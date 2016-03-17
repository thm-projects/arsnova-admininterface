window.AnswerOverView = Backbone.View.extend({
	initialize: function () {
		this.render();
	},
	render: function () {
		$(this.el).html(this.template(i18n));
		for (var i = 0; i < this.model.length; i++) {
			var answer = new Answer();
			answer.attributes = this.model[i];
			var answerView = new AnswerView({model: question});
			$(this.el).append(answerView.render().el);
		}
		return this;
	},
});
