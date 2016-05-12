App.View.UserSessionOverView = Backbone.View.extend({
	initialize: function () {
		this.render();
	},
	render: function () {
		var raw = {
			username: this.model
		};
		$.extend(raw, i18n);
		$(this.el).html(this.template(raw));
		return this;
	},
	asyncDataLoad: function () {
		var username = this.model;
		var sessionService = new App.Service.SessionService();
		sessionService.getUserSessions(username, {
			success: function (data) {
				this.userSessionInfoOverView = new App.View.SessionInfoOverView({model: data});
				$('#user-sessions', this.el).html(this.userSessionInfoOverView.el);
			},
			error: function () {
				//show error nicely. but not now
			}
		});
		sessionService.getUserVisitedSessions(username, {
			success: function (data) {
				if (data) {
					this.userVisitedSessionInfoOverView = new App.View.SessionInfoOverView({model: data});
					$('#user-visited-sessions', this.el).html(this.userVisitedSessionInfoOverView.el);
				}
			},
			error: function () {
				//show error nicely. but not now
			}
		});
	}
});
