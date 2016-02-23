window.LoginView = Backbone.View.extend({
	events: {
		"click .js-login": "login",
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
		$.ajax({
			url: "api/auth/login?type=arsnova&user=" +
			username + "&password=" + password,
			type: 'POST',
			success: function (data) {
				app.navigate("/home", true);
			}
		});
	}
});
