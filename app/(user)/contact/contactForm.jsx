"use client";
import { useState } from "react";
import SnackbarSimple from "../Components/SnakeBar";

export default function ContactForm() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        // e.preventDefault();

        // const res = await fetch("/api/contact", {
        //     method: "POST",
        //     body: JSON.stringify(form),
        // });

        // if (res.ok) {
        //     setForm({ name: "", email: "", message: "" });
        //     setSnack({ open: true, message: "contact detail send successfully", severity: "success" });
        // } else {
        //     setForm({ name: "", email: "", message: "" });
        //     setSnack({ open: true, message: "contact detail send failed", severity: "error" });
        // }
    };

    return (
        <>
            <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        required
                    />
                </div>

                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        required
                    />
                </div>

                <div>
                    <textarea
                        name="message"
                        placeholder="Your Message..."
                        rows="4"
                        value={form.message}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition"
                >
                    Send Message
                </button>

            </form>
            <SnackbarSimple
                open={snack.open}
                setOpen={(open) => setSnack({ ...snack, open })}
                message={snack.message}
                severity={snack.severity}
            />
        </>
    );
}
