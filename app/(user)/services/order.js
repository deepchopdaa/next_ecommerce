import { apiClient } from "../../utility/apiClient";

export function createOrder({ submitdata, token }) {
    return apiClient("/api/orders", {
        method: "POST",
        body: JSON.stringify(submitdata),
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}