App.View.SessionInfoView = Backbone.View.extend({
	events: {
		"click .js-expand-model": "toggleExpand",
		"click .js-delete-model": "deleteSession"
	},
	initialize: function () {
		this.render();
	},
	render: function () {
		var raw = this.model.toJSON();
		$.extend(raw, i18n);
		$(this.el).html(this.template(raw));
		return this;
	},
	toggleExpand: function () {
		$('.expanded-model', this.el).toggle();
		$('.indicator', this.el).toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
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
