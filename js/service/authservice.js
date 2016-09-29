App.Service.AuthService = function () {
	return {
		whoami: function (callbacks) {
			$.ajax({
				url: window.App.apiPath + "/whoami",
				type: 'GET',
				success: function () {
					//localStorage.setItem("loggedIn", true);
					callbacks.success();
				},
				error: function () {
					//localStorage.removeItem("loggedIn");
					callbacks.error();
					//app.initialize();
					/*if (Backbone.history.getFragment() !== "imprint") {
						app.navigate("login", true);
					}*/
				}
			});
		},
		login: function (username, password, options) {
			$.ajax({
				url: window.App.apiPath + "/auth/login?type=arsnova&user=" +
				username + "&password=" + password,
				type: 'POST',
				success: function (data) {
					//localStorage.setItem("loggedIn", true);
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
					app.initialize();
					app.navigate("/login", true);
				}
			});
		}
	};
};
