// app/contact/page.jsx
import ContactForm from "./contactForm.jsx";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
            <div className="max-w-4xl w-full bg-white shadow-lg rounded-xl p-10">

                {/* Header */}
                <h1 className="text-4xl font-bold text-center mb-4">Contact Us</h1>
                <p className="text-gray-600 text-center mb-10">
                    We'd love to hear from you! Fill out the form below and we’ll get back to you shortly.
                </p>

                {/* Contact Form */}
                <ContactForm />

                {/* Contact info */}
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                    <div>
                        <h3 className="font-semibold text-gray-800 text-lg">📍 Address</h3>
                        <p className="text-gray-600 mt-1">Ahmedabad, Gujarat, India</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-800 text-lg">📞 Phone</h3>
                        <p className="text-gray-600 mt-1">+91 98765 43210</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-800 text-lg">✉ Email</h3>
                        <p className="text-gray-600 mt-1">support@myshop.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
