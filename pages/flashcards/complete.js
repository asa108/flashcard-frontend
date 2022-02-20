import { useEffect,useState } from 'react'
import Link from "next/link";
import { parseCookies } from "@/helpers/index";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import FlashcardList from "@/components/FlashcardList";

export default function CompletePage({ flashcards }) {
  const [fl, setFl] = useState(flashcards)

  useEffect(() => {
    checkIfAuth()
  }, [])
 
  const checkIfAuth = () => {
    const checkIfFlase = (flashcard) => {
      return flashcard.check1 === true || flashcard.check2 === true || flashcard.check3 === true
     }
    fl = flashcards.filter(checkIfFlase)
    setFl(fl)
}
 
  return (
    <Layout title="Completed Words | Flashcard">
      <h1>All words you memorized</h1>
       <FlashcardList flashcards={fl} />
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
    props: { flashcards:flashcards || null, token:token|| null },
  };
}
