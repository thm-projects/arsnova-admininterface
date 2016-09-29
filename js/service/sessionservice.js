App.Service.SessionService = function () {
	return {
		getSession: function (key, options) {
			$.ajax({
				url: window.App.apiPath + "/session/" + key + "?admin=true",
				type: 'GET',
				success: options.success,
				error: function () {
					console.log("error fetching session via key: " + key);
					options.error();
				}
			});
		},
		getUserSessions: function (username, options) {
			$.ajax({
				url: window.App.apiPath + "/session/?ownedonly=true&username=" + username,
				tpye: 'GET',
				success: options.success,
				error: function () {
					console.log("error fetching user sessions for " + username);
					options.error();
				}
			});
		},
		getUserVisitedSessions: function (username, options) {
			$.ajax({
				url: window.App.apiPath + "/session/?visitedonly=true&username=" + username,
				tpye: 'GET',
				success: options.success,
				error: function () {
					console.log("error fetching user sessions for " + username);
					options.error();
				}
			});
		},
		export: function (key, options) {
			$.ajax({
				url: window.App.apiPath + "/session/export?sessionkey=" + key + "&withAnswerStatistics=true&withFeedbackQuestions=true",
				type: "GET",
				success: options.success,
				error: function () {
					console.log("error export session w/ key: " + key);
					options.error();
				}
			});
		},
		delete: function (key, options) {
			$.ajax({
				url: window.App.apiPath + "/session/" + key,
				type: "DELETE",
				success: options.success,
				error: function () {
					console.log("error deleting session w/ key: " + key);
					options.error();
				}
			});
		},
		update: function (session, options) {
			$.ajax({
				url: window.App.apiPath + "/session/" + session.keyword,
				type: "PUT",
				data: JSON.stringify(session),
				dataType: "json",
				contentType: "application/json",
				success: options.success,
				error: function () {
					console.log("error updating session w/ key: " + session.keyword);
					options.error();
				}
			});
		},
		updateCreator: function (session, options) {
			$.ajax({
				url: window.App.apiPath + "/session/" + session.keyword + "/changecreator",
				type: "PUT",
				data: JSON.stringify(session.creator),
				dataType: "json",
				contentType: "application/json",
				success: options.success,
				error: function () {
					console.log("error updating session w/ key: " + session.keyword);
					options.error();
				}
			});
		},
		getCount: function (key, type, options) {
			var getParamString = "";
			if (type === "preparation") {
				getParamString = "&preparationquestionsonly=true";
			} else if (type === "lecture") {
				getParamString = "&lecturequestionsonly=true";
			} else if (type === "flashcard") {
				getParamString = "&flashcardsonly=true";
			}
			$.ajax({
				url: window.App.apiPath + "/lecturerquestion/count?sessionkey=" + key + getParamString,
				type: "GET",
				success: options.success,
				error: function () {
					console.log("error getting skillquestioncount for sesionkey " + key);
					options.error();
				}
			});
		}
	};
};
