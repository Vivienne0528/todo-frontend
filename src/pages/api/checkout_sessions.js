// pages/api/checkout_sessions.js
import { stripe } from '../../../lib/stripe';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const origin = req.headers.origin;

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: 'price_1RhJmjCofuptodBOWsarjJjN', // ✅ 替换成你自己的价格 ID
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/?canceled=true`,
      });

      res.redirect(303, session.url);
    } catch (err) {
      console.error(err);
      res.status(err.statusCode || 500).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
