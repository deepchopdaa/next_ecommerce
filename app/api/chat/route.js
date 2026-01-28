import { GoogleGenerativeAI } from "@google/generative-ai";
import { connectDB } from "@/lib/db";
import Product from "@/models/product";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
    try {
        const { question } = await req.json();

        // 1️⃣ Fetch product data (LIMITED)
        await connectDB();
        const products = await Product.find()
            .select("name price category brand description")
            .lean();

        // 2️⃣ Convert products to text context
        const productContext = products
            .map(
                (p) =>
                    `Product: ${p.name}, Category: ${p.category}, Brand: ${p.brand}, Price: ₹${p.price},DiscountPrice:₹${p?.discountPrice} , Seller:${p?.sellerId}, Branch:${p?.branch}`
            )
            .join("\n");

        // 3️⃣ Gemini prompt (RULE BASED)
        const prompt = `
You are an myntra product recommendation assistant.
You MUST recommend products only from the list below.
If the question is unrelated, politely say you can help only with products.

PRODUCT LIST:
${productContext}

USER QUESTION:
${question}
`;

        // 4️⃣ Gemini model
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash"
        });

        const result = await model.generateContent(prompt);
        const reply = result.response.text();

        return Response.json({ reply });

    } catch (error) {
        console.error(error);
        return Response.json(
            { reply: "Sorry, something went wrong." },
            { status: 500 }
        );
    }
}
