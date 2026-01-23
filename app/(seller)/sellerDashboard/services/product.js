import { apiClient } from "@/app/utility/apiClient";

/* UserDetail */
export function getUserDetail() {
    return apiClient("/api/user/userDetail", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",

        }
    });
}

/* products Category / Brands */
export function getCategory() {
    return apiClient("/api/admin/category", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",

        }
    });
}
export function getBrands() {
    return apiClient("/api/admin/brand", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",

        }
    });
}

/* Product Crud */
export function getProducts() {
    return apiClient("/api/seller/product", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",

        }
    });
}

export function createAndUpdateProducts({ url, method, formData }) {
    return apiClient(`${url}`, {
        method: method,
        body: formData,

    });
}

export function deleteProducts({ deleteId }) {
    return apiClient(`/api/seller/product?id=${deleteId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",

        }
    });
}
