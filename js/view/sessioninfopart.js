App.View.SessionInfoPart = Backbone.View.extend({
	initialize: function () {
		this.render();
	},
	render: function () {
		$(this.el).html(this.template(this.model));
		return this;
	},
	toggleVisibility: function () {
		$(".dont-display", this.el).show();
	}
});
