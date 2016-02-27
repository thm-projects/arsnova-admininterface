window.MotdView = Backbone.View.extend({
	events: {
		"click .js-expand-model": "toggleExpand",
		"click .js-delete-model": "deleteMotd",
	},
	initialize: function () {

	},
	render: function () {
		var raw = this.model.toJSON();
		raw.text = markdown.toHTML(raw.text);
		$(this.el).html(this.template(raw));
		return this;
	},
	toggleExpand: function () {
		$('.expanded-model', this.el).toggle();
		$('.indicator', this.el).toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
	},
	deleteMotd: function () {
		var me = this;
		motdService.deleteMotd(this.model.attributes.motdkey, {
			success: function () {
				window.rootView.model = _.without(window.rootView.model, me.model.attributes);
				window.rootView.render();
			},
			error: function () {
			}
		})
	},
});
