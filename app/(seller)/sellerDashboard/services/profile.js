import { apiClient } from "@/app/utility/apiClient";

/* profile */
export function getSellerProfile(token) {
    return apiClient("/api/seller/profile", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

/* branches */
export function createSellerBranch({ form, sellerId, token }) {
    return apiClient(`/api/seller/profile/branch`, {
        method: "POST",
        body: JSON.stringify({
            ...form,
            sellerId,
        }),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });
}

export function updateSellerBranch({ data, seller, token }) {
    return apiClient(`/api/seller/profile/${seller._id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });
}

export function deleteSellerBranch({ id, token }) {
    return apiClient(`/api/seller/profile/branch/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });
}


export function primarySellerBranch({ payload, token }) {
    return apiClient(`/api/seller/profile/branch`, {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });
}