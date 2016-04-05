window.SessionView = Backbone.View.extend({
	events: {
		"click .js-show-lectureQuestions": "lectureQuestions",
		"click .js-show-preparationQuestions": "preparationQuestions",
		"click .js-show-interposedQuestions": "interposedQuestions",
		"click .js-show-motds": "motds",
		"click .js-delete-all": "deleteAll",
		"click .js-export": "export",
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
	lectureQuestions: function () {
		app.navigate("/session/" + sessionStorage.getItem("sessionkey") + "/lecturequestions", true);
	},
	preparationQuestions: function () {
		app.navigate("/session/" + sessionStorage.getItem("sessionkey") + "/preparationquestions", true);
	},
	interposedQuestions: function () {
		app.navigate("/session/" + sessionStorage.getItem("sessionkey") + "/interposedquestions", true);
	},
	motds: function () {
		app.navigate("/motd", true);
	},
	deleteAll: function () {
		sessionService.delete(sessionStorage.getItem("sessionkey"), {
			success: function (data) {
				app.navigate("/home", true);
			},
			error: function () {
			}
		});
	},
	export: function () {
		var successFunction = this.writeExportDataToFile;
		sessionService.export(sessionStorage.getItem("sessionkey"), {
			success: function (data) {
				for (var i = 0; i < data.length; i++) {
					successFunction(data[i]);
				}
			},
			error: function () {

			}
		});
	},
	writeExportDataToFile: function (exportData) {
		var jsonData = JSON.stringify({exportData: exportData});
		var dateString = "";
		var d = new Date();

		dateString = ('0' + d.getFullYear()).slice(-2) + '-'
		+ ('0' + (d.getMonth() + 1)).slice(-2) + '-'
		+ ('0' + d.getDate()).slice(-2) + '-'
		+ ('0' + d.getHours()).slice(-2) + '-'
		+ ('0' + d.getMinutes()).slice(-2);
		var filename = exportData.session.name + dateString + ".json";

		var blob = new Blob([jsonData], {type: "text/plain;charset=utf-8"});
		var ua = window.navigator.userAgent;
		var msie = ua.indexOf("MSIE ");

		if (msie > 0 || navigator.userAgent.match(/Trident.*rv\:11\./)) {
			window.navigator.msSaveBlob(blob, filename);
		} else {
			var a = window.document.createElement('a');
			a.className = "session-export";
			a.href = window.URL.createObjectURL(blob);
			a.download = filename;

			// Append anchor to body.
			document.body.appendChild(a);
			a.click();
		}

		return jsonData;
	},
});
