import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/db"
import User from "@/models/user"

export async function POST(req) {
    try {

        await connectDB()
        const { email, password } = await req.json()
        console.log("request body", email, password);

        if (!email, !password) {
            return Response.json(
                { message: "all feild are required" },
                { status: 400 }
            )
        }

        const existUser = await User.findOne({ email });
        console.log(existUser, "exist User Detail")
        if (!existUser) {
            return Response.json({ message: "User Not Found Please Register" }, { status: 409 })
        }

        const passwordMatch = bcrypt.compare(existUser.password, password)
        console.log(passwordMatch, "password match")
        if (!passwordMatch) {
            return Response.json({ message: "Password Not Match" }, { status: 400 })
        }

        const userRole = existUser?.role || null


        const id = { _id: existUser._id }
        const token = jwt.sign(id, process.env.JWT_SECRET, { expiresIn: "24h" })

        console.log(token, "token")
        if (!token) {
            return Response.json({ message: "Token generation failed" }, { status: 500 })
        }

        return Response.json({ message: "login successfully", token: token, userRole }, { status: 201 })

    } catch (error) {
        return Response.json({ message: "server error" }, { status: 500 })
    }
}
