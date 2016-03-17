window.AnswerView = Backbone.View.extend({
	events: {
		"click .js-expand-model": "toggleExpand",
	},
	initialize: function () {
		this.render();
	},
	render: function () {
		var raw = this.model.toJSON();
		console.log(raw);
		raw.text = markdown.toHTML(raw.text);
		$.extend(raw, i18n);
		$(this.el).html(this.template(raw));
		return this;
	},
	toggleExpand: function () {
		$('.expanded-model', this.el).toggle();
		$('.indicator', this.el).toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
	},
	deleteQuestion: function () {

	},
});
