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
		this.motdOverView = new MotdOverView({model: this.model});
		$("#adminmotds", this.el).append(this.motdOverView.el);
		return this;
	},
	enterSession: function (e) {
		e.preventDefault();
		var sessionkey = $('#homeinputsessionkey').val();
		app.navigate("/session/" + sessionkey);
	},
	enterUser: function (e) {

	},
	newMotd: function (e) {
		$("#homeview", this.el).hide();
		var emptyMotd = new Motd();
		this.motdEditView = new MotdEditView({model: emptyMotd, callback: this.afterEditView, motdOverView: this.motdOverView});
		$("#homeAdditional", this.el).append(this.motdEditView.el);
	},
	deleteAllMotds: function (e) {
		var motdOverEl = this.motdOverView.el;
		var removeElem = function (motdkey) {
			motdService.deleteMotd(motdkey, {
				success: function () {
					$("#" + motdkey, motdOverEl).hide();
				},
				error: function () {
				}
			});
		};
		for (var i = 0; i < this.motdOverView.model.length; i++) {
			removeElem(this.motdOverView.model[i].motdkey);
		}
	},
	afterEditView: function (motd) {
		$("#homeview", this.el).show();
		$("#homeAdditional", this.el).empty();
	},
});
