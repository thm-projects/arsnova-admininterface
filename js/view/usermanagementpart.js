App.View.UserManagementPart = Backbone.View.extend({
	events: {
		"click .js-enter-user": "enterUser",
		"submit #homeusersearch": "enterUser"
	},
	initialize: function () {
		this.render();
	},
	render: function () {
		$(this.el).html(this.template(i18n));
		return this;
	},
	enterUser: function (e) {
		e.preventDefault();
		var username = $('#homeinputusername').val();
		sessionStorage.setItem("username", username);
		app.navigate("/user/" + username, true);
	}
});
