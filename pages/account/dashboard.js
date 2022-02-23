import { parseCookies } from "@/helpers/index";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Dashboard.module.css";
import Flashcard from "@/components/Flashcard";
import FlashcardList from "@/components/FlashcardList";

export default function DashboardPage({ flashcards, token }) {
  return (
    <Layout title="User Dashboard">
      <h1 className={styles.dash}>Dashbord</h1>
      <FlashcardList flashcards={flashcards} token={token} />
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  const res = await fetch(`${API_URL}/flashcards/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const flashcards = await res.json();

    // redirect regsiter pege when user not logged in
  if (token === undefined) {
    return {
      redirect: {
        destination: '/account/login',
        permanent: false,
      },
    }
  }

  return {
    props: { flashcards: flashcards || null, token:token||null },
  };
}
