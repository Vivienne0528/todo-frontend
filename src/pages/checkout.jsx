//src/pages/checkout.jsx
import { useRouter } from "next/router";

export default function CheckoutPage() {
  const router = useRouter();
  const { canceled } = router.query;

  if (canceled) {
    console.log(
      "Order canceled -- continue to shop around and checkout when you’re ready."
    );
  }

  return (
    <form action="/api/checkout_sessions" method="POST">
      <section>
        <button type="submit" role="link">
          Checkout
        </button>
      </section>
    </form>
  );
}
