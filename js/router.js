var AppRouter = Backbone.Router.extend({
	routes: {
		"": "login",
		"session/:key": "enterSession",
		"session/:key/lecturequestions": "showLectureQuestions",
		"session/:key/preparationquestions": "showPreparationQuestions",
		"session/:key/interposedquestions": "showInterposedQuestions",
	},
	initialize: function () {
		if (!$.cookie('JSESSIONID')) {
			this.headerView = null;
			$('.headtpl').html("");
		}
		else {
			this.headerView = new HeaderView();
			$('.headtpl').html(this.headerView.el);
		}
	},
	login: function () {
		if (!$.cookie('JSESSIONID')) {
			this.loginView = new LoginView();
			$('.maintpl').html(this.loginView.el);
		}
		else {
			this.homeView = new HomeView();
			$('.maintpl').html(this.homeView.el);
		}
	},
	enterSession: function (sessionkey) {
		var session = new Session();
		session.fetch(sessionkey, {
			success: function () {
				sessionStorage.setItem("sessionkey", sessionkey);
				this.sessionView = new SessionView({model: session});
				$('.maintpl').html(this.sessionView.el);
			},
			error: function () {
				console.log("error fetching session data");
			}
		});
	},
	showLectureQuestions: function (sessionkey) {
		var lectureQuestionCol = new LectureQuestionCollection();
		lectureQuestionCol.fetch(sessionkey, {
			success: function () {
				this.lectureQuestionOverView = new LectureQuestionOverView({model: lectureQuestionCol});
				$('.maintpl').html(this.lectureQuestionOverView.el);
			},
			error: function () {
				console.log("error fetching lectureQuestions");
			}
		});
	},
	showPreparationQuestions: function (sessionkey) {

	},
	showInterposedQuestions: function (sessionkey) {

	}
});
