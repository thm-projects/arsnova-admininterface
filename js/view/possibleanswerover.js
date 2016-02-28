window.PossibleAnswerOverView = Backbone.View.extend({
	initialize: function () {
		this.render();
	},
	render: function () {
		//$(this.el).html(this.template(i18n));
		for (var i = 0; i < this.model.length; i++) {
			var possibleAnswer = new PossibleAnswer();
			possibleAnswer.attributes = this.model[i];
			var possibleAnswerView = new PossibleAnswerView({model: possibleAnswer});
			$(this.el).append(possibleAnswerView.render().el);
		}
		return this;
	},
});
