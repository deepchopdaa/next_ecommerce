import { apiClient } from "@/app/utility/apiClient";


export function getBrands() {
    return apiClient("/api/admin/brand", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",

        }
    });
}

export function createBrand({ data }) {
    return apiClient("/api/admin/brand", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",

        }
    });
}

export function updateBrand({ editId, data }) {
    return apiClient(`/api/admin/brand/${editId}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",

        }
    });
}

export function deleteBrand({ id }) {
    return apiClient(`/api/admin/brand/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",

        }
    });
}