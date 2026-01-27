import { apiClient } from "@/app/utility/apiClient";

/* profile */
export function getSellerProfile() {
    return apiClient("/api/seller/profile", {
        method: "GET",
    });
}

/* branches */
export function createSellerBranch({ form, sellerId }) {
    return apiClient(`/api/seller/profile/branch`, {
        method: "POST",
        body: JSON.stringify({
            ...form,
            sellerId,
        })
    });
}

export function updateSellerBranch({ data, seller }) {
    return apiClient(`/api/seller/profile/${seller._id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

export function deleteSellerBranch({ id }) {
    return apiClient(`/api/seller/profile/branch/${id}`, {
        method: "DELETE"
    });
}


export function primarySellerBranch({ payload }) {
    return apiClient(`/api/seller/profile/branch`, {
        method: "PUT",
        body: JSON.stringify(payload),
    });
}