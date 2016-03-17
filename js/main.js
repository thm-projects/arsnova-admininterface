utils.loadTemplate([
	'HeaderView',
	'LoginView',
	'HomeView',
	'SessionView',
	'LectureQuestionView',
	'LectureQuestionOverView',
	'MotdView',
	'MotdOverView',
	'PossibleAnswerView',
	'AnswerOverView',
	'AnswerView',
], function () {
	app = new AppRouter();
	authService = new AuthService();
	motdService = new MotdService();
	sessionService = new SessionService();
	skillQuestionService = new SkillQuestionService();
	Backbone.history.start();
	if(!$.cookie('JSESSIONID')) {
		app.navigate("/", true);
	}
});
