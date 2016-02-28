window.LectureQuestionView = Backbone.View.extend({
	events: {
		"click .js-expand-model": "toggleExpand",
		"click .js-get-answers": "getAnswers",
		"click .js-get-possibleanswers": "getPossibleAnswers",
		"click .js-get-raw": "getRaw",
		"click .js-delete-model": "deleteQuestion",
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
	getAnswers: function () {

	},
	getPossibleAnswers: function (e) {
		if (!this.possibleAnswerOverView) {
			this.possibleAnswerOverView = new PossibleAnswerOverView({model: this.model.attributes.possibleAnswers});
			$('.possibleanswers', this.el).append(this.possibleAnswerOverView.el);
			$('.possibleanswers', this.el).show();
		}
		else {
			$('.possibleanswers', this.el).toggle();
		}
	},
	getRaw: function () {
	},
	deleteQuestion: function () {

	},
});
