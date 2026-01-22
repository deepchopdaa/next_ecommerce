import { apiClient } from "@/app/utility/apiClient";

const token = localStorage.getItem("token")
export function getsellerList() {
    return apiClient("/api/admin/sellerList", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });
}