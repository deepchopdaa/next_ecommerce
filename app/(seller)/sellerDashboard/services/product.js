import { apiClient } from "@/app/utility/apiClient";

/* UserDetail */
export function getUserDetail(token) {
    return apiClient("/api/user/userDetail", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });
}

/* products Category / Brands */
export function getCategory(token) {
    return apiClient("/api/admin/category", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });
}
export function getBrands(token) {
    return apiClient("/api/admin/brand", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });
}

/* Product Crud */
export function getProducts(token) {
    return apiClient("/api/seller/product", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });
}

export function createAndUpdateProducts({ url, method, formData, token }) {
    return apiClient(`${url}`, {
        method: method,
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

export function deleteProducts({ deleteId, token }) {
    return apiClient(`/api/seller/product?id=${deleteId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });
}
