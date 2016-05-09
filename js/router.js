AppRouter = Backbone.Router.extend({
	routes: {
		"": "login",
		"login": "login",
		"imprint": "imprint",
		"home": "home",
		"session/:key": "enterSession",
		"session/:key/lecturequestions": "showLectureQuestions",
		"session/:key/preparationquestions": "showPreparationQuestions",
		"session/:key/interposedquestions": "showInterposedQuestions",
		"session/:key/motds": "showSessionMotds",
		"skillquestion/:id": "showSkillQuestionAndAnswers",
		"skillquestion/:id/answers": "showSkillQuestionAnswers",
		"motd/new": "newMotd",
		"user/": "user",
		"user/:username": "showUser"
	},
	initialize: function () {
		if (!$.cookie('JSESSIONID')) {
			this.headerView = null;
			$('.headtpl').html("");
		} else {
			this.headerView = new App.View.HeaderView();
			$('.headtpl').html(this.headerView.el);
		}
		this.footerView = new App.View.FooterView();
		$('.foottpl').html(this.footerView.el);
	},
	login: function () {
		this.loginView = new App.View.LoginView();
		$('.maintpl').html(this.loginView.el);
	},
	imprint: function () {
		$('.maintpl').html(window.Templates.ImprintView);
	},
	home: function () {
		if ($.cookie('JSESSIONID')) {
			var motdService = new App.Service.MotdService();
			motdService.getAdminMotds({
				success: function (data) {
					this.homeView = new App.View.HomeView({model: data});
					$('.maintpl').html(this.homeView.el);
				},
				error: function () {
					this.homeView = new App.View.HomeView();
					$('.maintpl').html(this.homeView.el);
				}
			});
		} else {
			this.loginView = new App.View.LoginView();
			$('.maintpl').html(this.loginView.el);
		}
	},
	enterSession: function (sessionkey) {
		var sessionService = new App.Service.SessionService();
		sessionService.getSession(sessionkey, {
			success: function (data) {
				var session = new App.Model.Session(data);
				sessionStorage.setItem("sessionkey", sessionkey);
				this.sessionView = new App.View.SessionView({model: session});
				$('.maintpl').html(this.sessionView.el);
				this.sessionView.asyncDataLoad();
			},
			error: function () {
				//show error nicely. but not now
			}
		});
	},
	showLectureQuestions: function (sessionkey) {
		var skillQuestionService = new App.Service.SkillQuestionService();
		skillQuestionService.getLectureQuestionsForSession(sessionkey, {
			success: function (data) {
				this.skillQuestionOverView = new App.View.SkillQuestionOverView({model: data});
				$('.maintpl').html(this.skillQuestionOverView.el);
			},
			error: function () {
				//show error nicely. but not now
			}
		});
	},
	showPreparationQuestions: function (sessionkey) {
		var skillQuestionService = new App.Service.SkillQuestionService();
		skillQuestionService.getPreparationQuestionsForSession(sessionkey, {
			success: function (data) {
				this.skillQuestionOverView = new App.View.SkillQuestionOverView({model: data});
				$('.maintpl').html(this.skillQuestionOverView.el);
			},
			error: function () {
				//show error nicely. but not now
			}
		});
	},
	showInterposedQuestions: function (sessionkey) {
		var interposedQuestionService = new App.Service.InterposedQuestionService();
		interposedQuestionService.get(sessionkey, {
			success: function (data) {
				this.interposedQuestionOverView = new App.View.InterposedQuestionOverView({model: data});
				$('.maintpl').html(this.interposedQuestionOverView.el);
			},
			error: function () {
				//show error nicely. but not now
			}
		});
	},
	showSkillQuestionAndAnswers: function (id) {
		var skillQuestion = null;
		var skillQuestionService = new App.Service.SkillQuestionService();
		var answerService = new App.Service.AnswerService();
		skillQuestionService.getSkillQuestion(id, {
			success: function (data) {
				skillQuestion = data;
			},
			error: function () {
			}
		});
		answerService.getAnswersForSkillQuestion(id, {
			success: function (answerData) {
				skillQuestion.answers = answerData;
				this.questionAndAnswerOverView = new App.View.QuestionAndAnswerOverView({model: skillQuestion});
				$('.maintpl').html(this.questionAndAnswerOverView.el);
			},
			error: function () {
			}
		});
	},
	showSkillQuestionAnswers: function (id) {
		var answerService = new App.Service.AnswerService();
		answerService.getAnswersForSkillQuestion(id, {
			success: function (data) {
				this.answerOverView = new App.View.AnswerOverView({model: data});
				$('.maintpl').html(this.answerOverView.el);
			},
			error: function () {
			}
		});
	},
	showSessionMotds: function (sessionkey) {
		var motds = [];
		if (!sessionStorage.getItem("motds")) {
			var motdService = new App.Service.MotdService();
			motdService.getSessionMotds(sessionkey, {
				success: function (data) {
					sessionStorage.setItem("motds", JSON.stringify(data));
				},
				error: function () {
				}
			});
		}
		if (sessionStorage.getItem("motds")) {
			motds = JSON.parse(sessionStorage.getItem("motds"));
		}
		this.motdOverView = new App.View.MotdOverView({model: motds});
		$('.maintpl').html(this.motdOverView.el);
	},
	newMotd: function () {
		var motd = new App.Model.Motd();
		this.newMotd = new App.View.MotdEditView({model: motd});
		$('.maintpl').html(this.newMotd.el);
	},
	user: function () {
		this.pageHeaderPart = new App.View.PageHeaderPart({model: {pageTitle: "User Management"}});
		this.userManagementPart = new App.View.UserManagementPart();
		$('.maintpl').html(this.pageHeaderPart.el);
		$('.maintpl').append(this.userManagementPart.el);
	},
	showUser: function (user) {
		var username = "";
		if (sessionStorage.getItem("username")) {
			username = sessionStorage.getItem("username");
		} else if (user !== "") {
			username = user;
		}
		this.userSessionOverView = new App.View.UserSessionOverView({model: username});
		$('.maintpl').html(this.userSessionOverView.el);
		this.userSessionOverView.asyncDataLoad();
	}
});
