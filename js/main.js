utils.loadTemplate([
	'HeaderView',
	'LoginView',
	'HomeView',
	'SessionView',
	'LectureQuestionView',
	'LectureQuestionOverView',
], function () {
	app = new AppRouter();
	Backbone.history.start();
	if(!$.cookie('JSESSIONID')) {
		app.navigate("/", true);
	}
});

//sessionkey: 44826863
