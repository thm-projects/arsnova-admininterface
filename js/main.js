utils.loadTemplate([
	'HeaderView',
	'LoginView',
	'HomeView',
	'SessionView',
	'SkillQuestionView',
	'SkillQuestionOverView',
	'MotdView',
	'MotdOverView',
	'PossibleAnswerView',
	'AnswerOverView',
	'AnswerView',
	'QuestionAndAnswerOverView',
], function () {
	app = new AppRouter();
	authService = new AuthService();
	motdService = new MotdService();
	sessionService = new SessionService();
	skillQuestionService = new SkillQuestionService();
	answerService = new AnswerService();
	Backbone.history.start();
	if(!$.cookie('JSESSIONID')) {
		app.navigate("/", true);
	}
});
