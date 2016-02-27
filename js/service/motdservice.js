var MotdService = function () {
	return {
		getAdminMotds: function (options) {
			$.ajax({
				url: "api/motd/?adminview=true",
				type: "GET",
				success: options.success,
				error: function () {
					console.log("Error fetching Admin Motds");
					options.error();
				}
			});
		},
		getSessionMotds: function (key, options) {
			$.ajax({
				url: "api/motd/?sessionkey=" + key,
				type: "GET",
				success: options.success,
				error: function () {
					console.log("Error fetching Session Motds");
					options.error();
				}
			});
		},
		deleteMotd: function (key, options) {
			$.ajax({
				url: "api/motd/" + key,
				type: "DELETE",
				success: options.success,
				error: function () {
					console.log("Error deleting MotD");
					options.error();
				}
			});
		}
	}
}
