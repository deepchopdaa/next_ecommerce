import { apiClient } from "@/app/utility/apiClient";

export function getMyorders(token) {
    return apiClient("/api/seller/myorders", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

export function updateOrderStatus({ selectedOrder, orderStatus, token }) {
    return apiClient(`/api/seller/myorders/${selectedOrder?._id}/status`, {
        method: "PATCH",
        body: JSON.stringify(orderStatus),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });
}