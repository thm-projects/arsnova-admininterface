window.MotdView = Backbone.View.extend({
	events: {
		"click .js-expand-model": "toggleExpand",
		"click .js-delete-model": "deleteMotd",
	},
	initialize: function (options) {
		this.render();
		this.parentView = options.parentView;
	},
	render: function () {
		var raw = this.model.toJSON();
		raw.text = markdown.toHTML(raw.text);
		var start = new Date(raw.startdate);
		var end = new Date(raw.enddate);
		raw.start = start.getDate() + "." + (start.getMonth() + 1) + "." + start.getFullYear();
		raw.end = end.getDate() + "." + (end.getMonth() + 1) + "." + end.getFullYear();
		$.extend(raw, i18n);
		$(this.el).html(this.template(raw));
		return this;
	},
	toggleExpand: function () {
		$('.expanded-model', this.el).toggle();
		$('.indicator', this.el).toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
	},
	deleteMotd: function () {
		var motd = this.model;
		var parentView = this.parentView;
		var el = this.el;
		motdService.deleteMotd(motd.attributes.motdkey, {
			success: function () {
				parentView.model = _.without(parentView.model, motd.attributes);
				$(el).hide();
			},
			error: function () {
			}
		});
	},
});
