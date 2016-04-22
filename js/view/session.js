App.View.SessionView = Backbone.View.extend({
	events: {
		"click .js-show-lectureQuestions": "lectureQuestions",
		"click .js-show-preparationQuestions": "preparationQuestions",
		"click .js-show-interposedQuestions": "interposedQuestions",
		"click .js-show-motds": "motds",
		"click .js-delete-all": "deleteAll",
		"click .js-show-user": "showUser",
		"click .js-toggle-change-user-form": "toggleChangeUserForm",
		"click .js-toggle-info": "toggleInfo",
		"click .js-change-user": "changeUser",
		"click .js-export": "export",
	},
	initialize: function () {
		this.render();
	},
	render: function () {
		var raw = this.model.toJSON();
		var creationTime = new Date(raw.creationTime);
		var creationTimeString = creationTime.toDateString();
		var lastOwnerActivity = new Date(raw.lastOwnerActivity);
		var lastOwnerActivityString = lastOwnerActivity.toDateString();
		$.extend(raw, {
			parsedCreationTime: creationTimeString,
			parsedLastOwnerActivity: lastOwnerActivityString
		});
		$.extend(raw, i18n);
		$(this.el).html(this.template(raw));
		return this;
	},
	asyncDataLoad: function () {
		var sessionkey = sessionStorage.getItem("sessionkey");
		var me = this;
		sessionService.getCount(sessionkey, "lecture", {
			success: function (data) {
				$("#lecture-question-badge").html(data);
			},
			error: function () {}
		});
		sessionService.getCount(sessionkey, "preparation", {
			success: function (data) {
				$("#preparation-question-badge").html(data);
			},
			error: function () {}
		});
		interposedQuestionService.getCount(sessionkey, {
			success: function (data) {
				$("#interposed-question-badge").html(data);
			},
			error: function () {}
		});
		motdService.getSessionMotds(sessionkey, {
			success: function (data) {
				me.motds = data;
				if (me.motds.length > 0) {
					sessionStorage.setItem("motds", JSON.stringify(data));
				}
				$("#motd-badge").html(me.motds.length);
			},
			error: function () {
				me.motds = [];
				$("#motd-badge").html(me.motds.length);
			}
		});
	},
	lectureQuestions: function () {
		if ($("#lecture-question-badge").val() !== 0) {
			app.navigate("/session/" + sessionStorage.getItem("sessionkey") + "/lecturequestions", true);
		}
	},
	preparationQuestions: function () {
		if ($("#lecture-question-badge").val() !== 0) {
			app.navigate("/session/" + sessionStorage.getItem("sessionkey") + "/preparationquestions", true);
		}
	},
	interposedQuestions: function () {
		if ($("#lecture-question-badge").val() !== 0) {
			app.navigate("/session/" + sessionStorage.getItem("sessionkey") + "/interposedquestions", true);
		}
	},
	motds: function () {
		if (sessionStorage.getItem("motds")) {
			app.navigate("/session/" + sessionStorage.getItem("sessionkey") + "/motds", true);
		}
	},
	deleteAll: function () {
		sessionService.delete(sessionStorage.getItem("sessionkey"), {
			success: function () {
				app.navigate("/home", true);
			},
			error: function () {
			}
		});
	},
	toggleChangeUserForm: function () {
		$('#change-user-form', this.el).toggle();
	},
	toggleInfo: function () {
		$('.session-info', this.el).toggle();
	},
	changeUser: function (e) {
		e.preventDefault();
		var newUsername = $('#newusername').val();
		var sessionModel = this.model.toJSON();
		sessionModel.creator = newUsername;
		sessionService.update(sessionModel, {
			success: function () {
				console.log("sessionowner changed successfully");
				$('.dont-display', this.el).toggle();
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

		dateString = ('0' + d.getFullYear()).slice(-2) + '-' +
			('0' + (d.getMonth() + 1)).slice(-2) + '-' +
			('0' + d.getDate()).slice(-2) + '-' +
			('0' + d.getHours()).slice(-2) + '-' +
			('0' + d.getMinutes()).slice(-2);
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
