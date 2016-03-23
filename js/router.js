var AppRouter = Backbone.Router.extend({
	routes: {
		"": "login",
		"login": "login",
		"imprint": "imprint",
		"home": "home",
		"session/:key": "enterSession",
		"session/:key/lecturequestions": "showLectureQuestions",
		"session/:key/preparationquestions": "showPreparationQuestions",
		"session/:key/interposedquestions": "showInterposedQuestions",
		"skillquestion/:id": "showSkillQuestionAndAnswers",
		"skillquestion/:id/answers": "showSkillQuestionAnswers",
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
		this.footerView = new FooterView();
		$('.foottpl').html(this.footerView.el);
	},
	login: function () {
		this.loginView = new LoginView();
		$('.maintpl').html(this.loginView.el);
	},
	imprint: function () {
		$('.maintpl').html(window.Templates["ImprintView"]);
	},
	home: function () {
		if ($.cookie('JSESSIONID')) {
			motdService.getAdminMotds({
				success: function (data) {
					this.homeView = new HomeView({model:data});
					$('.maintpl').html(this.homeView.el);
				},
				error: function () {
					this.homeView = new HomeView();
					$('.maintpl').html(this.homeView.el);
				}
			});
		}
		else {
			this.loginView = new LoginView();
			$('.maintpl').html(this.loginView.el);
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
				this.skillQuestionOverView = new SkillQuestionOverView({model: data});
				$('.maintpl').html(this.skillQuestionOverView.el);
			},
			error: function () {
				//show error nicely. but not now
			}
		});
	},
	showPreparationQuestions: function (sessionkey) {
		skillQuestionService.getPreparationQuestionsForSession(sessionkey, {
			success: function (data) {
				this.skillQuestionOverView = new SkillQuestionOverView({model: data});
				$('.maintpl').html(this.skillQuestionOverView.el);
			},
			error: function () {
				//show error nicely. but not now
			}
		});
	},
	showInterposedQuestions: function (sessionkey) {

	},
	showSkillQuestionAndAnswers: function (id) {
		var skillQuestion = null;
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
				this.questionAndAnswerOverView = new QuestionAndAnswerOverView({model: skillQuestion});
				$('.maintpl').html(this.questionAndAnswerOverView.el);
			},
			error: function () {
			}
		});
	},
	showSkillQuestionAnswers: function (id) {
		answerService.getAnswersForSkillQuestion(id, {
			success: function (data) {
				this.answerOverView = new AnswerOverView({model: data});
				$('.maintpl').html(this.answerOverView.el);
			},
			error: function () {

			}
		});
	},
});
