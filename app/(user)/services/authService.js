import { apiClient } from "../../utility/apiClient";

export function registerUser(payload) {
    return apiClient("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export function loginUser(payload) {
    return apiClient("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}
