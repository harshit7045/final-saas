import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config({ path: './src/.env' });

const stripe = new Stripe('sk_test_51PosA3H35XY8u0JzapupiEC7LHJRgpnoR5nQGAc6OznpLmstr2bqk5ezYsKU0zHx3lmOqDGU68lGgcPL6XonPnsi00vw3Rveja');
const YOUR_DOMAIN = process.env.FRONTEND_DOMAIN || 'http://localhost:5173';

const paymentController = {
  createCheckOutSession: async (req, res) => {
    try{
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: parseInt(req.body.amount) * 100,
            product_data: {
              name: "Adding Money",
              description: "Adding Money",
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    res.send({ clientSecret: session.client_secret });
      } catch (error) { 
        res.status(500).send({ error: "Failed to create checkout session" });
      }
  },

  sessionStatus: async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

      res.send({
        status: session.payment_status,
        customer_email: session.customer_details.email,
        amount: session.amount_total,
      });
          } catch (error) {
            res.status(500).send({ error: "Failed to retrieve session status" });
          }
  },
};

export default paymentController;
