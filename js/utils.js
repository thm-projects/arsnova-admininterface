App.utils = {
	loadConfiguration: function () {
		$.ajax({
			url: "arsnova-config",
			type: 'GET',
			success: function (data) {
				window.App.apiPath = data.apiPath;
			},
			error: function () {
				console.log("error loading arsnova config");
			}
		});
	},

	// Asynchronously load templates located in separate .html files
	loadTemplate: function (views, callback) {
		var deferreds = [];
		window.Templates = [];
		$.each(views, function (index, view) {
			if (App.View[view]) {
				deferreds.push($.get('html/' + view.toLowerCase() + '.html', function (data) {
					App.View[view].prototype.template = _.template(data);
				}));
			} else {
				deferreds.push($.get('html/' + view.toLowerCase() + '.html', function (data) {
					App.Template[view] = _.template(data);
				}));
			}
		});

		$.when.apply(null, deferreds).done(callback);
	},

	displayValidationErrors: function (messages) {
		for (var key in messages) {
			if (messages.hasOwnProperty(key)) {
				this.addValidationError(key, messages[key]);
			}
		}
		this.showAlert('Warning!', 'Fix validation errors and try again', 'alert-warning');
	},

	addValidationError: function (field, message) {
		var controlGroup = $('#' + field).parent().parent();
		controlGroup.addClass('error');
		$('.help-inline', controlGroup).html(message);
	},

	removeValidationError: function (field) {
		var controlGroup = $('#' + field).parent().parent();
		controlGroup.removeClass('error');
		$('.help-inline', controlGroup).html('');
	},

	showAlert: function (title, text, klass) {
		$('.alert').removeClass("alert-error alert-warning alert-success alert-info");
		$('.alert').addClass(klass);
		$('.alert').html('<strong>' + title + '</strong> ' + text);
		$('.alert').show();
	},

	hideAlert: function () {
		$('.alert').hide();
	}

};
