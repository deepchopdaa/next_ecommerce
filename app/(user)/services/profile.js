import { apiClient } from "../../utility/apiClient";


export function getMyOrders() {
    return apiClient(`/api/orders`, {
        method: "GET",
    });
}
export function getUserDetail() {
    return apiClient(`/api/user/userDetail`, {
        method: "GET",
    });
}
export function updateUserDetail({ formData, userId }) {
    return apiClient(`/api/user/userDetail"`, {
        method: "PUT",
        body: JSON.stringify({ ...formData, userId }),
    });
}

