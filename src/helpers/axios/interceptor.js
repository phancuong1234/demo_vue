const getToken = () => {
  const token = localStorage.getItem("access_token");
  if (!token) return null;
  return "Bearer " + token;
};
const onRequest = (config) => {
  const token = getToken();
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
};

const onRequestError = (error) => {
  return Promise.reject(error);
};

const onResponse = (response) => {
  return response.data;
};

const onResponseError = (error) => {
  return Promise.reject(error);
};

export function setupInterceptorsTo(axiosInstance) {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
