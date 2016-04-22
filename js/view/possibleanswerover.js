App.View.PossibleAnswerOverView = Backbone.View.extend({
	initialize: function () {
		this.render();
	},
	render: function () {
		//$(this.el).html(this.template(i18n));
		for (var i = 0; i < this.model.length; i++) {
			var possibleAnswer = new App.View.PossibleAnswer();
			possibleAnswer.attributes = this.model[i];
			var possibleAnswerView = new App.View.PossibleAnswerView({model: possibleAnswer});
			$(this.el).append(possibleAnswerView.render().el);
		}
		return this;
	},
});
