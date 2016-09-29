App.Service.MotdService = function () {
	return {
		getAdminMotds: function (options) {
			$.ajax({
				url: window.App.apiPath + "/motd/?adminview=true",
				type: "GET",
				success: options.success,
				error: function () {
					console.log("Error fetching Admin MotDs");
					options.error();
				}
			});
		},
		getSessionMotds: function (key, options) {
			$.ajax({
				url: window.App.apiPath + "/motd/?adminview=true&sessionkey=" + key,
				type: "GET",
				success: options.success,
				error: function () {
					console.log("Error fetching Session MotDs");
					options.error();
				}
			});
		},
		deleteMotd: function (key, options) {
			$.ajax({
				url: window.App.apiPath + "/motd/" + key,
				type: "DELETE",
				success: options.success,
				error: function () {
					console.log("Error deleting MotD");
					options.error();
				}
			});
		}
	};
};
