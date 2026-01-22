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
        console.log(decoded, "decoded token")

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
        console.log("middleware error:", error.constructor);
        return NextResponse.json({ message: error.message }, { status: 409 });
    }
}

/* This Congfigration For Protected Api Route */
export const config = {
    matcher: ["/api/user/userDetail/:path*", "/api/orders/:path*", "/api/seller/:path*", "/api/seller/product/:path*"],
    runtime: "nodejs",
};
