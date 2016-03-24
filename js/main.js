utils.loadTemplate([
	'HeaderView',
	'FooterView',
	'ImprintView',
	'LoginView',
	'HomeView',
	'SessionView',
	'SkillQuestionView',
	'SkillQuestionOverView',
	'MotdView',
	'MotdOverView',
	'MotdEditView',
	'PossibleAnswerView',
	'AnswerOverView',
	'AnswerView',
	'QuestionAndAnswerOverView',
], function () {
	authService = new AuthService();
	motdService = new MotdService();
	sessionService = new SessionService();
	skillQuestionService = new SkillQuestionService();
	answerService = new AnswerService();
	app = new AppRouter();
	authService.whoami();
	Backbone.history.start();
});
