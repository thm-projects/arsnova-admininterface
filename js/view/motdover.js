window.MotdOverView = Backbone.View.extend({
	initialize: function () {
		this.render();
	},
	render: function () {
		$(this.el).html(this.template(i18n));
		for (var i = 0; i < this.model.length; i++) {
			var motd = new Motd();
			motd.attributes = this.model[i];
			var motdView = new MotdView({model: motd});
			$(".models", this.el).append(motdView.render().el);
		}
		return this;
	},
});
