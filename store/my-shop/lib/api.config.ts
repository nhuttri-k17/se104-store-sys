import axios from "axios";

const apiConfig = (baseUrl: string) =>
    axios.create({
        baseURL: baseUrl,
        headers: {
            "Content-Type": "application/json",
        },
    });

export default apiConfig;
