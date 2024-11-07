import axios from "axios";

export const APIClient = (() => {
	const instance = axios.create();

	instance.interceptors.request.use(async (config) => {
		config.baseURL = "";
		// config.headers.Authorization = `Bearer ${token}`;
		return config;
	});

	instance.interceptors.response.use(
		function (response) {
			return response;
		},
		function (error) {
			if ([401, 403].includes(error.response?.status)) {
				// sign out user if any 401 error appears
				// signOut(getAuth());
			} else {
				return Promise.reject(error);
			}
		},
	);

	return instance;
})();
