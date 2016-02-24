window.HeaderView = Backbone.View.extend({
	events: {
		"click .js-logout": "logout",
		"click .js-enter-session": "enterSession"
	},
	initialize: function () {
		this.render();
	},
	render: function () {
		$(this.el).html(this.template());
		return this;
	},
	logout: function () {
		var req = $.ajax({
			url: "api/auth/logout",
			type: 'GET',
			success: function (data) {
				$.removeCookie("JSESSIONID", {path: "/"});
				app.initialize();
				app.navigate("/", true);
			}
		});
	},
	enterSession: function (e) {
		e.preventDefault();
		var sessionkey = $('#inputsessionkey').val();
		app.navigate("/session/" + sessionkey);
	}
});
