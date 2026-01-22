import { apiClient } from "../../utility/apiClient";

const token = localStorage.getItem("token")
export function addReview({ values, productId }) {
    return apiClient("/api/user/userDetail/reviews", {
        method: "POST",
        body: JSON.stringify({ ...values, productId }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    });
}

