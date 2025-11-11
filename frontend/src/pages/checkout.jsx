import Header from "../components/header";
import Footer from "../components/footer";
import { CheckoutForm } from "../components/stripe";

export default function CheckoutPage() {
    return (
        <>
            <Header />
            <CheckoutForm />
            <Footer />
        </>
    );
}