window.HomeView = Backbone.View.extend({
	events: {
		"click .js-enter-session": "enterSession"
	},
	initialize: function () {
		this.render();
	},
	render: function () {
		$(this.el).html(this.template(i18n));
		return this;
	},
	enterSession: function (e) {
		e.preventDefault();
		var sessionkey = $('#homeinputsessionkey').val();
		app.navigate("/session/" + sessionkey);
	}
});
