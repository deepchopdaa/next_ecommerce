import { apiClient } from "../../utility/apiClient";
const userId = localStorage.getItem("userId")
export function onBoardUser(payload) {
    console.log(userId, "userId , service file log")
    return apiClient("/api/auth/onBoard", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            Authorization: userId,
        }
    });
}