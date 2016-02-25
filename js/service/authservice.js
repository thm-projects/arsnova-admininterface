var AuthService = function () {
	return {
		whoami: function () {
			$.ajax({
				url: "api/whoami",
				type: 'GET',
				success: function (data) {
				},
				error: function () {
					$.removeCookie("JSESSIONID", {path: "/"});
					app.initialize();
					app.navigate("/", true);
				}
			});
		},
		login: function (username, password, options) {
			$.ajax({
				url: "api/auth/login?type=arsnova&user=" +
				username + "&password=" + password,
				type: 'POST',
				success: function (data) {
					options.success(data);
				},
				error: function () {
					options.error();
				}
			});
		}
	}
};
