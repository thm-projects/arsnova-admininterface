window.HeaderView = Backbone.View.extend({
	events: {
		"click .js-logout": "logout",
		"click .js-enter-session": "enterSession"
	},
	initialize: function () {
		this.render();
	},
	render: function () {
		$(this.el).html(this.template(i18n));
		return this;
	},
	logout: function () {
		authService.logout();
	},
	enterSession: function (e) {
		e.preventDefault();
		var sessionkey = $('#inputsessionkey').val();
		app.navigate("/session/" + sessionkey, true);
	}
});
