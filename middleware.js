import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function middleware(req) {
    try {
        console.log("middleware calling....");

        const token = req.headers.get("Authorization")?.split(" ")[1];
        console.log("token:", token);

        if (!token) {
            return NextResponse.json({ message: "No token provided" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded:", decoded);

        if (!decoded?._id) {
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }

        const requestHeaders = new Headers(req.headers);
        requestHeaders.set("userId", decoded._id);

        console.log(requestHeaders, 'request Headers')

        return NextResponse.next({
            request: {
                headers: requestHeaders
            }
        });

    } catch (error) {
        console.log("middleware error:", error);
        return NextResponse.json({ message: "server error" }, { status: 500 });
    }
}

/* This Congfigration For Protected Api Route */
export const config = {
    matcher: ["/api/user/userDetail/:path*", "/api/orders/:path*", "/api/admin/product/:path*"],
    runtime: "nodejs",
};
