window.Session = Backbone.Model.extend({
	urlRoot: "api/session",
	defaults: {
		_rev: "",
		type: "",
		name: "",
		active: "",
		shortName: "",
		creator: "",
		keyword: "",
		courseId: "",
		courseType: "",
		creationTime: "",
		learningProgressType: "",
		ppAuthorName: "",
		ppAuthorMail: "",
		ppUniversity: "",
		ppLogo: "",
		ppSubject: "",
		ppLicense: "",
		ppDescription: "",
		ppFaculty: "",
		ppLevel: "",
		sessionType: "",
		feedbackLock: ""
	},
	initialize: function () {
	},
	fetch: function (key, options) {
		var me = this;
		$.ajax({
			url: "api/session/" + key,
			type: 'GET',
			success: function (data) {
				me.attributes = data;
				options.success();
			},
			error: options.error
		});
	}
});
