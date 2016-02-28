window.PossibleAnswerView = Backbone.View.extend({
	initialize: function () {

	},
	render: function () {
		var raw = this.model.toJSON();
		$.extend(raw, i18n);
		raw.text = markdown.toHTML(raw.text);
		$(this.el).html(this.template(raw));
		return this;
	},
});
