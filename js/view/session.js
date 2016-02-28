window.SessionView = Backbone.View.extend({
	events: {
		"click .js-show-lectureQuestions": "lectureQuestions",
		"click .js-show-preparationQuestions": "preparationQuestions",
		"click .js-show-interposedQuestions": "interposedQuestions",
		"click .js-show-motds": "motds",
	},
	initialize: function () {
		this.render();
	},
	render: function () {
		var raw = this.model.toJSON();
		$.extend(raw, i18n);
		$(this.el).html(this.template(raw));
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
	},
	motds: function () {
		app.navigate("/motd", true);
	}
});
