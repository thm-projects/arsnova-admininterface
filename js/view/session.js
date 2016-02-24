window.SessionView = Backbone.View.extend({
	events: {
		"click .js-show-lectureQuestions": "lectureQuestions",
		"click .js-show-preparationQuestions": "preparationQuestions",
		"click .js-show-interposedQuestions": "interposedQuestions"
	},
	initialize: function () {
		this.render();
	},
	render: function () {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},
	lectureQuestions: function () {
		app.navigate("/session/" + sessionStorage.getItem("sessionkey") + "/lecturequestions", true);
	},
	preparationQuestions: function () {
		app.navigate("/session/" + sessionStorage.getItem("sessionkey") + "/preparationquestions", true);
	},
	interposedQuestions: function () {
		app.navigate("/session/" + sessionStorage.getItem("sessionkey") + "/interposedquestions", true);
	}
});
