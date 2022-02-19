import { useEffect,useState } from 'react'
import Link from "next/link";
import { parseCookies } from "@/helpers/index";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import FlashcardList from "@/components/FlashcardList";

export default function CompletePage({ flashcards }) {
  const [fl, setFl] = useState(flashcards)
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
      return flashcard.check1 === true || flashcard.check2 === true || flashcard.check3 === true
     }
    fl = flashcards.filter(checkIfFlase)
    setFl(fl)
  } 
}
 
  return (
    <Layout title="Completed Words | Flashcard">
      <h1>AAA</h1>
      {auth ? <h1>Landing Page</h1> :
       <FlashcardList flashcards={fl} />
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
  if (req.headers.token === undefined) {
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
