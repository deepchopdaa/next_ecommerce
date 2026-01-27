import { apiClient } from "@/app/utility/apiClient";

export function getMyorders() {
    return apiClient("/api/seller/myorders", {
        method: "GET",
    });
}

export function updateOrderStatus({ selectedOrder, orderStatus }) {
    return apiClient(`/api/seller/myorders/${selectedOrder?._id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ orderStatus: orderStatus }),
    });
}