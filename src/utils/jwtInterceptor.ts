import axios from "axios";

function jwtInterceptor() {
  axios.interceptors.request.use((req) => {
    const token = window.localStorage.getItem("token");
    const hasToken = Boolean(token);

    if (hasToken) {
      req.headers = {
        ...req.headers,
        Authorization: `Bearer ${token}`,
      };
      console.log('🔑 JWT Interceptor: Added Authorization header for', req.url);
    } else {
      console.log('⚠️ JWT Interceptor: No token found for', req.url);
    }

    return req;
  });

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        console.log('🚫 JWT Interceptor: 401 Unauthorized - clearing token');
        window.localStorage.removeItem("token");
        // Only redirect if not already on login page
        if (window.location.pathname !== '/login') {
          window.location.replace("/");
        }
      }
      return Promise.reject(error);
    }
  );
}

export default jwtInterceptor;

