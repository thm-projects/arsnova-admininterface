App.View.PossibleAnswerOverView = Backbone.View.extend({
	initialize: function () {
		this.render();
	},
	render: function () {
		for (var i = 0; i < this.model.length; i++) {
			var possibleAnswer = new App.Model.PossibleAnswer();
			possibleAnswer.attributes = this.model[i];
			var possibleAnswerView = new App.View.PossibleAnswerView({model: possibleAnswer});
			$(this.el).append(possibleAnswerView.render().el);
		}
		return this;
	}
});
