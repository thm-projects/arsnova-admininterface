App.View.SessionInfoView = Backbone.View.extend({
	events: {
		"click .js-expand-model": "toggleExpand",
		"click .js-enter-session": "enterSession",
		"click .js-delete-model": "deleteSession"
	},
	initialize: function () {
		this.render();
	},
	render: function () {
		var raw = this.model.toJSON();
		raw.name = _.escape(raw.name);
		$.extend(raw, i18n);
		var creationTime = new Date(raw.creationTime);
		var creationTimeString = creationTime.toDateString();
		var lastOwnerActivityString = "";
		if (raw.lastOwnerActivity) {
			var lastOwnerActivity = new Date(raw.lastOwnerActivity);
			lastOwnerActivityString = lastOwnerActivity.toDateString();
		} else {
			lastOwnerActivityString = "-";
		}
		$.extend(raw, {
			parsedCreationTime: creationTimeString,
			parsedLastOwnerActivity: lastOwnerActivityString
		});
		this.sessionInfoPart = new App.View.SessionInfoPart({model: raw});
		$(this.el).html(this.template(raw));
		$("#session-info-part", this.el).html(this.sessionInfoPart.el);
		this.sessionInfoPart.toggleVisibility();
		return this;
	},
	toggleExpand: function () {
		$('.expanded-model', this.el).toggle();
		$('.indicator', this.el).toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
	},
	enterSession: function () {
		app.navigate("/session/" + this.model.attributes.keyword, true);
	},
	deleteSession: function () {
		var sessionService = new App.Service.SessionService();
		sessionService.delete(this.model.attributes.id, {
			success: function () {
				app.navigate("/home", true);
			},
			error: function () {
			}
		});
	}
});
