// pages/success.jsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Success() {
  const router = useRouter();
  const { session_id } = router.query;

  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!session_id) return;

    fetch(`/api/checkout_sessions?session_id=${session_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSession(data);
        }
      });
  }, [session_id]);

  if (!session_id) return <p>Loading session id...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!session) return <p>Loading session data...</p>;

  if (session.status === "open") {
    // 你可以用 router.push('/') 重定向
    router.push("/");
    return null;
  }

  if (session.status === "complete") {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{" "}
          {session.customer_details.email}. If you have any questions, please
          email <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    );
  }

  return <p>Unknown session status</p>;
}
