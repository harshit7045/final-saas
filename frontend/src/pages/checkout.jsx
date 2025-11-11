import Header from "../components/header";
import Footer from "../components/footer";
import { CheckoutForm } from "../components/stripe";

export default function CheckoutPage() {
    return (
        <>
            <Header />
            <div
                className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#0a0021] via-[#3b006d] to-[#0a0021] text-white pt-24 pb-20 px-4"
                style={{ fontFamily: "Inter, 'Noto Sans', sans-serif" }}
            >
                {/* Glow backdrop */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/30 blur-3xl rounded-full animate-pulse"></div>
                    <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/20 blur-3xl rounded-full animate-pulse"></div>
                </div>

                {/* Checkout container */}
                <div className="relative z-10 w-full max-w-2xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8 sm:p-10 transition-transform hover:scale-[1.01]">
                    <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-8 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400">
                        Secure Checkout
                    </h1>

                    {/* Stripe form */}
                    <div className="w-full">
                        <CheckoutForm />
                    </div>


                    <p className="text-sm text-gray-300 mt-6 text-center">
                        Payments are processed securely via Stripe 🔒
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
}
