import { useEffect,useState } from 'react'
import Link from "next/link";
import { parseCookies } from "@/helpers/index";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import FlashcardList from "@/components/FlashcardList";

export default function HomePage({ flashcards,token }) {
  const [fl, setFl] = useState(flashcards)
    // console.log('fl',fl)

  const [auth,setAuth] = useState(false)

  useEffect(() => {
    checkIfAuth()
  }, [])
 
  const checkIfAuth = () => {
  if (flashcards.statusCode === 401 || flashcards.statusCode === 403) {
    setAuth(true)
  } else {
    setAuth(false)
    const checkIfFlase = (flashcard) => {
      return flashcard.check1 === false || flashcard.check2 === false || flashcard.check3 === false
     }
    setFl(flashcards.filter(checkIfFlase))
  } 
}
 
  return (
    <Layout title="Home Page | Flashcard">
      {auth ? <h1>Landing Page</h1> :
       <FlashcardList flashcards={fl} token={token} />
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

  return {
    props: { flashcards:flashcards || null, token:token|| null },
  };
}
