import { apiClient } from "../../utility/apiClient";

const token = localStorage.getItem("token")

export function createOrder(payload) {
    return apiClient("/api/orders", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}