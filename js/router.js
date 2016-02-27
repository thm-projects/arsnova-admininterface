var AppRouter = Backbone.Router.extend({
	routes: {
		"": "login",
		"home": "login",
		"session/:key": "enterSession",
		"session/:key/lecturequestions": "showLectureQuestions",
		"session/:key/preparationquestions": "showPreparationQuestions",
		"session/:key/interposedquestions": "showInterposedQuestions",
		"motd": "getAdminMotds",
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
			authService.whoami();
			this.homeView = new HomeView();
			$('.maintpl').html(this.homeView.el);
		}
	},
	enterSession: function (sessionkey) {
		sessionService.getSession(sessionkey, {
			success: function (data) {
				var session = new Session(data);
				sessionStorage.setItem("sessionkey", sessionkey);
				this.sessionView = new SessionView({model: session});
				$('.maintpl').html(this.sessionView.el);
			},
			error: function () {
				//show error nicely. but not now
			}
		});
	},
	showLectureQuestions: function (sessionkey) {
		skillQuestionService.getLectureQuestionsForSession(sessionkey, {
			success: function (data) {
				this.lectureQuestionOverView = new LectureQuestionOverView({model: data});
				$('.maintpl').html(this.lectureQuestionOverView.el);
			},
			error: function () {
				//show error nicely. but not now
			}
		});
	},
	showPreparationQuestions: function (sessionkey) {

	},
	showInterposedQuestions: function (sessionkey) {

	},
	getAdminMotds: function () {
		motdService.getAdminMotds({
			success: function (data) {
				this.motdView = new MotdOverView({model: data});
				$('.maintpl').html(this.motdView.el);
				window.rootView = this.motdView;
			},
			error: function () {
				//show error nicely. but not now
			}
		});
	}
});
