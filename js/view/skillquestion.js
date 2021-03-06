App.View.SkillQuestionView = Backbone.View.extend({
	events: {
		"click .js-expand-model": "toggleExpand",
		"click .js-get-answers": "getAnswers",
		"click .js-get-possibleanswers": "getPossibleAnswers",
		"click .js-get-raw": "getRaw",
		"click .js-delete-model": "deleteQuestion"
	},
	initialize: function () {
		this.render();
	},
	render: function () {
		var raw = this.model.toJSON();
		raw.possibleAnswerCount = this.model.attributes.possibleAnswers.length;
		raw.text = markdown.toHTML(raw.text);
		$.extend(raw, i18n);
		$(this.el).html(this.template(raw));
		if (this.model.attributes.questionType === "grid") {
			$('.js-get-answers', this.el).hide();
			$('.js-get-possibleanswers', this.el).hide();
		} else if (raw.possibleAnswerCount === 0) {
			$('.js-get-possibleanswers', this.el).hide();
		}
		return this;
	},
	toggleExpand: function () {
		$('.expanded-model', this.el).toggle();
		$('.indicator', this.el).toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
	},
	getAnswers: function () {
		app.navigate("skillquestion/" + this.model.attributes._id, true);
	},
	getPossibleAnswers: function () {
		if (!this.possibleAnswerOverView) {
			this.possibleAnswerOverView = new App.View.PossibleAnswerOverView({model: this.model.attributes.possibleAnswers});
			$('.possibleanswers', this.el).append(this.possibleAnswerOverView.el);
			$('.possibleanswers', this.el).show();
		} else {
			$('.possibleanswers', this.el).toggle();
		}
	},
	getRaw: function () {
		var exportData = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.model.attributes));
		var a = document.createElement('a');
		var time = new Date();
		var timestring = time.getDate() + "_" + (time.getMonth() + 1) + "_" + time.getFullYear();
		a.href = 'data:' + exportData;
		a.download = encodeURIComponent(this.model.attributes.subject) + "-" + timestring + ".json";
		a.innerHTML = '';
		event.target.appendChild(a);
		if (this.hasExport) {
			this.hasExport = false;
		} else {
			this.hasExport = true;
			a.click();
		}
	},
	deleteQuestion: function () {
		var htmlElement = $(this.el);
		var skillQuestionService = new App.Service.skillQuestionService();
		skillQuestionService.deleteSkillQuestion(this.model.attributes._id, {
			success: function () {
				htmlElement.hide();
			},
			error: function () {
				//noooop
			}
		});
	}
});
