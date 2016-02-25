window.LoginView = Backbone.View.extend({
	events: {
		"click .js-login": "login"
	},
	initialize: function () {
		this.render();
	},
	render: function () {
		$(this.el).html(this.template());
		return this;
	},
	login: function () {
		var username = encodeURIComponent($('#inputusername').val());
		var password = encodeURIComponent($('#inputpassword').val());
		authService.login(username, password, {
			success: function (data) {
				app.initialize();
				app.navigate("/home", true);
			}
		});
	}
});
