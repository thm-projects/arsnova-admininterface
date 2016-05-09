App.utils.loadTemplate([
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
	'InterposedQuestionView',
	'InterposedQuestionOverView',
	'UserSessionOverView',
	'SessionInfoView',
	'SessionInfoPart',
	'UserManagementPart',
	'PageHeaderPart'
], function () {
	app = new AppRouter();
	var authService = new App.Service.AuthService();
	authService.whoami();
	Backbone.history.start();
});
