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
        }),
        headers: {
            "Content-Type": "application/json",

        }
    });
}

export function updateSellerBranch({ data, seller }) {
    return apiClient(`/api/seller/profile/${seller._id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",

        }
    });
}

export function deleteSellerBranch({ id }) {
    return apiClient(`/api/seller/profile/branch/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",

        }
    });
}


export function primarySellerBranch({ payload }) {
    return apiClient(`/api/seller/profile/branch`, {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",

        }
    });
}