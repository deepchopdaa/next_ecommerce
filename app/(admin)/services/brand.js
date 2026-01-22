import { apiClient } from "@/app/utility/apiClient";

const token = localStorage.getItem("token")

export function getBrands() {
    return apiClient("/api/admin/brand", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });
}

export function createBrand(payload) {
    return apiClient("/api/admin/brand", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });
}

export function updateBrand({ editId, data }) {
    return apiClient(`/api/admin/brand/${editId}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });
}

export function deleteBrand(id) {
    return apiClient(`/api/admin/brand/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });
}