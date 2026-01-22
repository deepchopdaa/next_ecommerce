import { apiClient } from "../../utility/apiClient";


export function getMyOrders(token) {
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
export function updateUserDetail({ formData, userId, token }) {
    return apiClient(`/api/user/userDetail"`, {
        method: "PUT",
        body: JSON.stringify({ ...formData, userId }),
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

