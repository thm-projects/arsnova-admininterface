App.View.PageHeaderPart = Backbone.View.extend({
	initialize: function (options) {
		if (!options.subtitle) {
			options.subtitle = "";
		}
		var data = {
			pageTitle: options.title,
			pageSubTitle: options.subtitle
		};
		this.render(data);
	},
	render: function (data) {
		$(this.el).html(this.template(data));
		return this;
	},
	toggleVisibility: function () {
		$(".dont-display", this.el).show();
	}
});
