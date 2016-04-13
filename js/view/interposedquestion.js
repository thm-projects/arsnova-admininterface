window.InterposedQuestionView = Backbone.View.extend({
	events: {
		"click .js-expand-model": "toggleExpand",
	},
	initialize: function () {

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
});