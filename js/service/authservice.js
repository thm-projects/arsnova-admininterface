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
		}
	}
};
