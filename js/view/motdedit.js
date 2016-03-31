window.MotdEditView = Backbone.View.extend({
	events: {
		"click #motd_submit": "saveMotd",
	},
	initialize: function (options) {
		this.render();
		this.callback = options.callback;
		this.motdOverView = options.motdOverView;
	},
	render: function () {
		var timeForString = new Date();
		var startString = "";
		var endString = "";
		var raw = this.model.toJSON();
		if (!raw.motdkey) {
			var rightnow = new Date();
			startString = rightnow.getDate() + "." + (rightnow.getMonth() + 1) + "." + rightnow.getFullYear();
			rightnow.setDate(rightnow.getDate() + 7);
			endString = rightnow.getDate() + "." + (rightnow.getMonth() + 1) + "." + rightnow.getFullYear();
		}
		else {
			startString = raw.startdate.getDate() + "." + (raw.startdate.getMonth() + 1) + "." + raw.startdate.getFullYear();
			endString = raw.enddate.getDate() + "." + (raw.enddate.getMonth() + 1) + "." + raw.enddate.getFullYear();
		}
		$.extend(raw, i18n);
		$.extend(raw, {startdatestring: startString, enddatestring: endString});
		$(this.el).html(this.template(raw));
	},
	saveMotd: function (event) {
		event.preventDefault();
		var attrs = {
			title: $('#motd_title').val(),
			text: $('#motd_text').val(),
			startdate: this.getTimestampByString($('#motd_startdate').val()).toString(),
			enddate: this.getTimestampByString($('#motd_enddate').val()).toString(),
			audience: $('#motd_audience')[0].value,
		};
		var callback = this.callback;
		var motdOverView = this.motdOverView;
		var valid = this.model.save(attrs, {
			success: function (data) {
				motdOverView.model.push(data.attributes);
				motdOverView.render();
				callback(data);
			}
		});
		if (!valid) {
			this.showErrors(this.model.validationError);
		}
	},
	getTimestampByString: function (timestring) {
		var datestrings = [];
		var pos = null;
		var ret = null;
		var del = timestring.indexOf('.');
		if (!del) return "";
		datestrings[0] = timestring.substr(0, del);
		pos = timestring.indexOf('.') + 1;
		if (!pos) return "";
		del = timestring.indexOf('.', pos);
		if (!del) return "";
		datestrings[1] = timestring.substr(pos, del - pos);
		pos = timestring.indexOf('.', pos) + 1;
		if (!pos) return "";
		datestrings[2] = timestring.substr(pos);
		ret = new Date(datestrings[1] + "/" + datestrings[0] + "/" + datestrings[2]);
		return ret.getTime();
	},
	showErrors: function (errors) {
		console.log(errors);
		_.each(errors, function (error) {
			$('#motd_' + error.name + '_div').addClass('has-error');
		}, this);
	},

	hideErrors: function () {

	}
});
