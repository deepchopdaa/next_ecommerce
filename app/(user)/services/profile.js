import { apiClient } from "../../utility/apiClient";

const token = localStorage.getItem("token")

export function getMyOrders() {
    return apiClient(`/api/orders`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}
export function getUserDetail() {
    return apiClient(`/api/user/userDetail`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}
export function updateUserDetail({ formData, userId }) {
    return apiClient(`/api/user/userDetail"`, {
        method: "PUT",
        body: JSON.stringify({ ...formData, userId }),
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

