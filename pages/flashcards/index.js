import { useEffect,useState } from 'react'
import Link from "next/link";
import { parseCookies } from "@/helpers/index";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import FlashcardList from "@/components/FlashcardList";

export default function HomePage({ flashcards, token }) {
  
  const [fl, setFl] = useState(flashcards)
  
  useEffect(() => {
    checkIfAuth()
  }, [])
 
  const checkIfAuth = () => {
    const checkIfFlase = (flashcard) => {
      return flashcard.check1 === false || flashcard.check2 === false || flashcard.check3 === false
     }
    setFl(flashcards.filter(checkIfFlase))
}
 
  return (
    <Layout title="Home Page | Flashcard">
      <h1>Flashcard</h1>
     <FlashcardList flashcards={fl} token={token} />
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

    if (token === undefined) {
    return {
      redirect: {
        destination: '/flashcards/sample',
        permanent: false,
      },
    }
  }

  const flashcards = await res.json();

  return {
    props: { flashcards:flashcards || null, token:token|| null },
  };
}
