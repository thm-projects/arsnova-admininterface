window.MotdOverView = Backbone.View.extend({
	initialize: function () {
		this.render();
	},
	render: function () {
		$(this.el).html(this.template());
		for (var i = 0; i < this.model.length; i++) {
			var motd = new Motd();
			motd.attributes = this.model[i];
			var motdView = new MotdView({model: motd});
			$(this.el).append(motdView.render().el);
		}
		return this;
	},
});
