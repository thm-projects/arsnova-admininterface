var AppRouter = Backbone.Router.extend({
	routes: {
		"": "login",
		"home": "home"
	},
	initialize: function () {
		if($.cookie('JSESSIONID')) {
			this.headerView = new HeaderView();
			$('.headtpl').html(this.headerView.el);
		}
	},
	login: function () {
		this.loginView = new LoginView();
		$('.maintpl').html(this.loginView.el);
	},
	home: function () {
		this.loginView = new HomeView();
		$('.maintpl').html(this.loginView.el);
	}
});
