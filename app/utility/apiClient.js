export async function apiClient(url, options = {}) {
    const token =
        typeof window !== "undefined"
            ? localStorage.getItem("token")
            : null;
    const res = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        credentials: "include",
        ...options,
    });

    let data;
    try {
        data = await res.json();
    } catch {
        data = null;
    }

    if (
        res.status === 409 &&
        data?.message?.toLowerCase() === "jwt expired"
    ) {
        localStorage.clear();
        window.location.href = "/login";
        return;
    }
    console.log(res, "responce")
    console.log(data, "data of the responce")

    if (!res.ok) {
        throw new Error(data?.message || "Something went wrong");
    }

    return data;
}
