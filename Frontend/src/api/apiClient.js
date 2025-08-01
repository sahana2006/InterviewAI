import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

// ✅ Define public endpoints (no token required)
const isPublicEndpoint = (url) => {
  return (
    url.includes("/register") ||
    url.includes("/token") ||
    url.includes("/login")
  );
};

apiClient.interceptors.request.use(async (config) => {
  // ⛔ Skip token logic for public routes
  if (isPublicEndpoint(config.url)) return config;

  let accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  if (isTokenExpired(accessToken) && refreshToken) {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/token/refresh/",
        {
          refresh: refreshToken,
        }
      );
      accessToken = response.data.access;
      localStorage.setItem("access_token", accessToken);
    } catch (err) {
      console.error("Token refresh failed", err);
      // Optional: redirect to login or clear storage
    }
  }

  // ✅ Attach token if available
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

function isTokenExpired(token) {
  if (!token) return true;
  try {
    const [, payload] = token.split(".");
    const decoded = JSON.parse(atob(payload));
    const exp = decoded.exp * 1000;
    return Date.now() > exp;
  } catch {
    return true;
  }
}

export default apiClient;
