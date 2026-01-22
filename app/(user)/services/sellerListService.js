import { apiClient } from "../../utility/apiClient";


export function getSellerList() {
    return apiClient(`/api/user/sellers`, {
        method: "GET",
    });
}
export function getSellerById(id) {
    return apiClient(`/api/user/sellers/${id}`, {
        method: "GET",
    });
}

export function getSellerProducts({ sellerId, branchId }) {
    let url = `/api/user/sellers/products?sellerId=${sellerId}`;

    if (branchId) {
        url += `&branchId=${branchId}`;
    }

    return apiClient(url, {
        method: "GET",
    });
}