//namespace allocation
(function () {
	window.App = {
		Model: {},
		View: {},
		Service: {}
	};
});

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
], function () {
	app = new AppRouter();
	authService.whoami();
	Backbone.history.start();
});
