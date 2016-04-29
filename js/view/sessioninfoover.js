App.View.SessionInfoOverView = Backbone.View.extend({
	initialize: function () {
		this.render();
	},
	render: function () {
		for (var i = 0; i < this.model.length; i++) {
			var sessionInfo = new App.Model.Session();
			sessionInfo.attributes = this.model[i];
			var sessionInfoView = new App.View.SessionInfoView({model: sessionInfo});
			$(this.el).append(sessionInfoView.render().el);
		}
		return this;
	}
});
