import { apiClient } from "@/app/utility/apiClient";

const token = localStorage.getItem("token")
export function getMyorders() {
    return apiClient("/api/seller/myorders", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

export function updateOrderStatus({ selectedOrder, orderStatus }) {
    return apiClient(`/api/seller/myorders/${selectedOrder?._id}/status`, {
        method: "PATCH",
        body: JSON.stringify(orderStatus),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });
}