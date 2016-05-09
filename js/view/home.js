App.View.HomeView = Backbone.View.extend({
	events: {
		"click .js-enter-session": "enterSession",
		"click .js-delete-all-motds": "deleteAllMotds",
		"click .js-add-new-motd": "newMotd"
	},
	initialize: function () {
		this.render();
	},
	render: function () {
		$(this.el).html(this.template(i18n));
		this.pageHeaderPart = new App.View.PageHeaderPart({title: i18n.lang_arsnova_slogan_title, subtitle: i18n.lang_arsnova_slogan_subtitle});
		$("#home-page-header", this.el).html(this.pageHeaderPart.el);
		this.userManagementPart = new App.View.UserManagementPart();
		$("#home-user-management-part", this.el).append(this.userManagementPart.el);
		window.app.motdOverView = new App.View.MotdOverView({model: this.model});
		$("#adminmotds", this.el).append(window.app.motdOverView.el);
		return this;
	},
	enterSession: function (e) {
		e.preventDefault();
		var sessionkey = $('#homeinputsessionkey').val().replace(/ /g,'');
		app.navigate("/session/" + sessionkey, true);
	},
	newMotd: function () {
		$("#homeview", this.el).hide();
		var emptyMotd = new App.Model.Motd();
		this.motdEditView = new App.View.MotdEditView({model: emptyMotd, callback: this.afterEditView, motdOverView: window.app.motdOverView});
		$("#homeAdditional", this.el).append(this.motdEditView.el);
	},
	deleteAllMotds: function () {
		var motdOverEl = window.app.motdOverView.el;
		var motdCollection = window.app.motdOverView.model;
		var removeElem = function (motd) {
			var motdService = new App.Service.MotdService();
			motdService.deleteMotd(motd.motdkey, {
				success: function () {
					$("#" + motd.motdkey, motdOverEl).hide();
					motdCollection = _.without(motdCollection, motd);
					window.app.motdOverView.model = motdCollection;
				},
				error: function () {
				}
			});
		};
		for (var i = 0; i < window.app.motdOverView.model.length; i++) {
			removeElem(window.app.motdOverView.model[i]);
		}
	},
	afterEditView: function (motd) {
		$("#homeview", this.el).show();
		$("#homeAdditional", this.el).empty();
		$("#" + motd.attributes.motdkey).children(".expanded-model").toggle();
		$("#" + motd.attributes.motdkey).find('.indicator').toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
	}
});
