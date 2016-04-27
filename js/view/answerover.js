App.View.AnswerOverView = Backbone.View.extend({
	initialize: function () {
		this.render();
	},
	render: function () {
		$(this.el).html(this.template(i18n));
		for (var i = 0; i < this.model.length; i++) {
			if (!this.model[i].abstention) {
				var answer = new App.Model.Answer();
				answer.attributes = this.model[i];
				var answerView = new App.View.AnswerView({model: answer});
				$(".models", this.el).append(answerView.render().el);
			}
		}
		return this;
	}
});
