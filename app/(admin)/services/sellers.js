import { apiClient } from "@/app/utility/apiClient";

export function getsellerList(token) {
    return apiClient("/api/admin/sellerList", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });
}