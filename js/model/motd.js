window.Motd = Backbone.Model.extend({
	url: "api/motd/",
	defaults: {
		"title": "",
		"text": "",
		"startdate": "",
		"enddate": "",
		"audience": "",
		"sessionkey": "",
	},
	validate: function (attrs) {
		var errors = [];
		if (!attrs.title) {
			errors.push({name: "title", msg: "title can't be empty"});
		}
		if (!attrs.text) {
			errors.push({name: "text", msg: "text can't be empty"});
		}
		if (!attrs.startdate) {
			errors.push({name: "startdate", msg: "startdate can't be empty"});
		}
		if (!attrs.enddate) {
			errors.push({name: "enddate", msg: "enddate can't be empty"});
		}
		if (!attrs.audience) {
			errors.push({name: "audience", msg: "audience can't be empty"});
		}
    return errors.length > 0 ? errors : false;
	}
});
