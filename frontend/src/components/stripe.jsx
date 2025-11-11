import React, { useCallback, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation, Navigate } from "react-router-dom";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import Cookies from "js-cookie";

const stripePromise = loadStripe(
  "pk_test_51PosA3H35XY8u0JzOYqafQzcmDFPIRl2cWXDIyAjyy8GnIuHSrpSVnHbhwgXWKfPqcRcgkWVosp4PxtYXDiYS5Lp00ZUWcBz4P"
);

const CheckoutForm = () => {
  const location = useLocation();
  const { amount } = location.state || { amount: 0 };

  const fetchClientSecret = useCallback(() => {
    const backendUrl = `http://${import.meta.env.VITE_BACKEND_IP || 'localhost'}:${import.meta.env.VITE_BACKEND_PORT || '4002'}`;
    return fetch(
      `${backendUrl}/api/payment/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => data.clientSecret)
      .catch(() => {
        return null;
      });
  }, [amount]);

  const options = { fetchClientSecret };

  return (
    <div id="checkout" style={{ width: "100vw", height: "60vh" }}>
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const [hasAddedBalance, setHasAddedBalance] = useState(false);

  useEffect(() => {
    const fetchSessionStatus = async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const sessionId = urlParams.get("session_id");

      try {
        const backendUrl = `http://${import.meta.env.VITE_BACKEND_IP || 'localhost'}:${import.meta.env.VITE_BACKEND_PORT || '4002'}`;
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
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffffff",
          flexDirection: "column",
          width: "100%",
          height: "50vh",
          borderRadius: "6px",
          padding: "20px",
          boxSizing: "border-box",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontWeight: "500",
            fontSize: "14px",
            lineHeight: "20px",
            color: "#242d60",
          }}
        >
          We appreciate your business! A confirmation email will be sent to{" "}
          {customerEmail}. If you have any questions, please email{" "}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    );
  }

  return null;
};

async function addWalletBalance(amount) {
  try {
    if (!amount) {
      throw new Error("Amount is invalid.");
    }
    const backendUrl = `http://${import.meta.env.VITE_BACKEND_IP || 'localhost'}:${import.meta.env.VITE_BACKEND_PORT || '4002'}`;
    const response = await fetch(
      `${backendUrl}/api/user/wallet`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: Cookies.get("usertoken"),
        },
        body: JSON.stringify({
          amount: amount.toString(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
        } catch (error) {
        }
}

export { CheckoutForm, Return };
