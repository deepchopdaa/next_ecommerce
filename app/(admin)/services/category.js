import { apiClient } from "@/app/utility/apiClient";
export function getCategory() {
    return apiClient("/api/admin/category", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",

        }
    });
}

export function createCategory({ data }) {
    return apiClient("/api/admin/category", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",

        }
    });
}

export function updateCategory({ editId, data }) {
    return apiClient(`/api/admin/category/${editId}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",

        }
    });
}

export function deleteCategory({ id }) {
    return apiClient(`/api/admin/category/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",

        }
    });
}