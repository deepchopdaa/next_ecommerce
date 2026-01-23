import { apiClient } from "../../utility/apiClient";

export function createOrder({ submitdata }) {
    return apiClient("/api/orders", {
        method: "POST",
        body: JSON.stringify(submitdata),

    });
}