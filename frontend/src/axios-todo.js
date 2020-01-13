import axios from "axios";

const instance = axios.create({
  baseUrl: "/api/",
  port: 8080
});

instance.defaults.headers.post["Content-Type"] = "application.json";
instance.defaults.headers.put["Content-Type"] = "application.json";
instance.defaults.headers.delete["Content-Type"] = "application.json";

export default instance;
