import { apiClient } from "@/app/utility/apiClient";

const token = localStorage.getItem("token")
export function getCategory() {
    return apiClient("/api/admin/category", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });
}

export function createCategory(payload) {
    return apiClient("/api/admin/category", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });
}

export function updateCategory({ editId, data }) {
    return apiClient(`/api/admin/category/${editId}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });
}

export function deleteCategory(id) {
    return apiClient(`/api/admin/category/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });
}