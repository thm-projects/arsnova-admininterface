window.AnswerView = Backbone.View.extend({
	events: {
		"click .js-delete-model": "deleteAnswer",
		"click .js-get-raw": "getRaw",
	},
	initialize: function () {
		this.render();
	},
	render: function () {
		var raw = this.model.toJSON();
		$.extend(raw, i18n);
		$(this.el).html(this.template(raw));
		return this;
	},
	getRaw: function () {
    var exportData = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.model.attributes));
    var a = document.createElement('a');
    var time = new Date();
    var timestring = time.getDate() + "_" + (time.getMonth() + 1) + "_" + time.getFullYear();
    a.href = 'data:' + exportData;
		var fileName = "answer";
		if ((this.model.attributes.subject != null) && (this.model.attributes.subject !== "")) {
			fileName = this.model.attributes.subject;
		}
    a.download = encodeURIComponent(fileName) + "-" + timestring + ".json";
    a.innerHTML = '';
    event.target.appendChild(a);
    if (this.hasExport) {
			this.hasExport = false;
    }
    else {
        this.hasExport = true;
        a.click();
    }
	},
	deleteAnswer: function () {
		var htmlElement = $(this.el);
		answerService.deleteAnswer(this.model.attributes.questionId, this.model.attributes._id, {
			success: function () {
				htmlElement.hide();
			},
			error: function () {
				//noooop
			}
		});
	}
});
