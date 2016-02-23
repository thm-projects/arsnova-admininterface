utils.loadTemplate([
	'HeaderView',
	'LoginView',
	'HomeView'
], function () {
	app = new AppRouter();
	Backbone.history.start();
	if(!$.cookie('JSESSIONID')) {
		app.navigate("/", true);
	}
});
