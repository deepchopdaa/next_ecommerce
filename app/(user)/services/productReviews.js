import { apiClient } from "../../utility/apiClient";

export function addReview({ values, productId }) {
    return apiClient("/api/user/userDetail/reviews", {
        method: "POST",
        body: JSON.stringify({ ...values, productId })
    });
}

