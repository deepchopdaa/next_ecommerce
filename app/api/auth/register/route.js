import { connectDB } from "@/lib/db";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {

        await connectDB();
        console.log("api called successfully")

        const { name, email, password } = await req.json();

        console.log("request body", name, email, password);
        if (!name, !email, !password) {
            return Response.json(
                { message: "all feild are required" },
                { status: 400 }
            )
        }

        const existUser = await User.findOne({ email });
        if (existUser) {
            return Response.json({ message: "User already exist" }, { status: 409 });
        }

        console.log("user varification complete password section start")
        const hashPassoword = await bcrypt.hash(password, 10)

        const newUser = await User.create({ name, email, password: hashPassoword })

        return Response.json(
            {
                message: "User Register Successfully",
                user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email
                }
            },
            { status: 201 }
        );

    } catch (error) {
        console.log(error)
        return Response.json(
            { message: "server error" },
            { status: 500 }
        );
    }
}