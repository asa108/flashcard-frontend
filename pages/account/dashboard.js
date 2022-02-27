import { parseCookies } from "@/helpers/index";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import Link from "next/link";
import styles from "@/styles/Dashboard.module.css";
import FlashcardList from "@/components/FlashcardList";

export default function DashboardPage({ flashcards, token }) {
  return (
    <Layout title="User Dashboard">
      <h1 className={styles.dash}>All words</h1>
     {flashcards.length === 0 ?
        <div>
          There is no cards.
             <br />
        <Link href='/flashcards/add'>
          <a>Add new flashcard!</a>
          </Link>  
        </div>
        :
       <FlashcardList flashcards={flashcards} token={token} />
      }
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
    props: { flashcards, token },
  };
}
