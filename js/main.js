utils.loadTemplate([
	'HeaderView',
	'LoginView',
	'HomeView',
	'SessionView',
	'LectureQuestionView',
	'LectureQuestionOverView',
], function () {
	app = new AppRouter();
	authService = new AuthService();
	Backbone.history.start();
	if(!$.cookie('JSESSIONID')) {
		app.navigate("/", true);
	}
});
