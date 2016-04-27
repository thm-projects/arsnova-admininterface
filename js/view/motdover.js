App.View.MotdOverView = Backbone.View.extend({
	initialize: function () {
		this.render();
	},
	render: function () {
		$(this.el).html(this.template(i18n));
		for (var i = 0; i < this.model.length; i++) {
			var motd = new App.Model.Motd();
			motd.attributes = this.model[i];
			var motdView = new App.View.MotdView({model: motd, parentView: this});
			$(".models", this.el).append(motdView.render().el);
		}
		return this;
	}
});
