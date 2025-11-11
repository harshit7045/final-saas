import React, { useCallback, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation, Navigate } from "react-router-dom";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import Cookies from "js-cookie";

// ✅ Stripe public key
const stripePromise = loadStripe(
  "pk_test_51PosA3H35XY8u0JzOYqafQzcmDFPIRl2cWXDIyAjyy8GnIuHSrpSVnHbhwgXWKfPqcRcgkWVosp4PxtYXDiYS5Lp00ZUWcBz4P"
);

const CheckoutForm = () => {
  const location = useLocation();
  const { amount } = location.state || { amount: 0 };

  // ✅ Use your original working backend route
  const fetchClientSecret = useCallback(() => {
    const backendUrl = `http://${
      import.meta.env.VITE_BACKEND_IP || "localhost"
    }:${import.meta.env.VITE_BACKEND_PORT || "4002"}`;

    return fetch(`${backendUrl}/api/payment/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret)
      .catch(() => null);
  }, [amount]);

  const options = { fetchClientSecret };

  return (
    <div
      className="flex justify-center items-center w-full px-4 md:px-0"
    >
      <div
        id="checkout"
        className="
                   bg-gradient-to-br from-[#15002c]/60 to-[#2e0057]/40 
                   rounded-2xl shadow-2xl border border-white/10 backdrop-blur-lg p-6
                   flex justify-center items-center"
      >
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
};

// ✅ Success / Return Page
const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const [hasAddedBalance, setHasAddedBalance] = useState(false);

  useEffect(() => {
    const fetchSessionStatus = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const sessionId = urlParams.get("session_id");

      try {
        const backendUrl = `http://${
          import.meta.env.VITE_BACKEND_IP || "localhost"
        }:${import.meta.env.VITE_BACKEND_PORT || "4002"}`;
        const response = await fetch(
          `${backendUrl}/api/payment/session-status?session_id=${sessionId}`
        );
        const data = await response.json();

        setStatus(data.status);
        setCustomerEmail(data.customer_email);

        if (data.status === "paid" && !hasAddedBalance && data.amount) {
          await addWalletBalance(data.amount);
          setHasAddedBalance(true);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    fetchSessionStatus();
  }, [hasAddedBalance]);

  if (status === "open") {
    return <Navigate to="/checkout" />;
  }

  if (status === "paid") {
    return (
      <section
        id="success"
        className="relative flex flex-col justify-center items-center  text-center
                   bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]
                   rounded-3xl shadow-2xl p-8 overflow-hidden"
      >
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="absolute bg-white/10 rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${10 + Math.random() * 20}px`,
                height: `${10 + Math.random() * 20}px`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></span>
          ))}
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 z-10">
          Payment Successful 💫
        </h2>

        <p className="text-white/80 text-sm md:text-base font-medium max-w-lg z-10">
          We appreciate your business! A confirmation email has been sent to{" "}
          <span className="text-[#00c6ff] font-semibold">{customerEmail}</span>.
          <br />
          If you have any questions, email{" "}
          <a
            href="mailto:orders@example.com"
            className="text-[#ff9ff3] hover:text-[#f368e0] underline transition"
          >
            orders@example.com
          </a>
          .
        </p>

        <button
          onClick={() => (window.location.href = "/dashboard")}
          className="mt-8 px-6 py-3 text-white font-semibold rounded-xl
                     bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:opacity-90 transition z-10"
        >
          Go to Dashboard
        </button>
      </section>
    );
  }

  return null;
};

// ✅ Add Wallet Balance helper
async function addWalletBalance(amount) {
  try {
    if (!amount) throw new Error("Amount invalid.");
    const backendUrl = `http://${
      import.meta.env.VITE_BACKEND_IP || "localhost"
    }:${import.meta.env.VITE_BACKEND_PORT || "4002"}`;
    const response = await fetch(`${backendUrl}/api/user/wallet`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: Cookies.get("usertoken"),
      },
      body: JSON.stringify({ amount: amount.toString() }),
    });

    if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
  } catch (error) {
    console.error("Wallet update error:", error);
  }
}

// ✅ Export both components
export { CheckoutForm, Return };
