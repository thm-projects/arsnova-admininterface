window.LectureQuestionView = Backbone.View.extend({
	events: {
		"click .js-expand-question": "toggleExpand",
	},
	initialize: function () {
		this.render();
	},
	render: function () {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},
	toggleExpand: function () {
		$('.expanded-question', this.el).toggle();
		$('.indicator', this.el).toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
	}
});
