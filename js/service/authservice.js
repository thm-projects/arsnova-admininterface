App.Service.AuthService = function () {
	return {
		whoami: function () {
			$.ajax({
				url: window.App.apiPath + "/whoami",
				type: 'GET',
				success: function () {
				},
				error: function () {
					$.removeCookie("JSESSIONID", {path: "/"});
					app.initialize();
					if (Backbone.history.getFragment() !== "imprint") {
						app.navigate("login", true);
					}
				}
			});
		},
		login: function (username, password, options) {
			$.ajax({
				url: window.App.apiPath + "/auth/login?type=arsnova&user=" +
				username + "&password=" + password,
				type: 'POST',
				success: function (data) {
					options.success(data);
				},
				error: function () {
					options.error();
				}
			});
		},
		logout: function () {
			$.ajax({
				url: window.App.apiPath + "/auth/logout",
				type: 'GET',
				success: function () {
					$.removeCookie("JSESSIONID", {path: "/"});
					app.initialize();
					app.navigate("/login", true);
				}
			});
		}
	};
};
