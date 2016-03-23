window.HomeView = Backbone.View.extend({
	events: {
		"click .js-enter-session": "enterSession",
		"click .js-enter-user": "enterUser",
		"click .js-delete-all-motds": "deleteAllMotds",
		"click .js-add-new-motd": "newMotd",
	},
	initialize: function () {
		this.render();
	},
	render: function () {
		$(this.el).html(this.template(i18n));
		if (this.model) {
			this.motdOverView = new MotdOverView({model: this.model});
			$("#adminmotds", this.el).append(this.motdOverView.el);
		}
		return this;
	},
	enterSession: function (e) {
		e.preventDefault();
		var sessionkey = $('#homeinputsessionkey').val();
		app.navigate("/session/" + sessionkey);
	},
	enterUser: function (e) {

	},
	deleteAllMotds: function (e) {

	},
	newMotd: function (e) {

	},
});
