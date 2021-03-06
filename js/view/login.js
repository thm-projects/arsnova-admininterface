App.View.LoginView = Backbone.View.extend({
	events: {
		"click .js-login": "login",
		"submit form": "login"
	},
	initialize: function () {
		this.render();
	},
	render: function () {
		$(this.el).html(this.template(i18n));
		return this;
	},
	login: function () {
		var username = encodeURIComponent($('#inputusername').val());
		var password = encodeURIComponent($('#inputpassword').val());
		var authService = new App.Service.AuthService();
		authService.login(username, password, {
			success: function () {
				app.initialize();
				app.navigate("/home", true);
			}
		});
	}
});
