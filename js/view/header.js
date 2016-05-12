App.View.HeaderView = Backbone.View.extend({
	events: {
		"click .js-logout": "logout"
	},
	initialize: function () {
		this.render();
	},
	render: function () {
		$(this.el).html(this.template(i18n));
		return this;
	},
	logout: function () {
		var authService = new App.Service.AuthService();
		authService.logout();
	}
});
