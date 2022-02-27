import { useEffect,useState } from 'react'
import { parseCookies } from "@/helpers/index";
import Link from "next/link";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import FlashcardList from "@/components/FlashcardList";

export default function CompletePage({ flashcards,token }) {
  const [fl, setFl] = useState(flashcards)  

  useEffect(() => {
    checkIfAuth()
  }, [])

    const checkIfAuth = () => {
    const checkIfCheckValue = (flashcard) => {
      return flashcard.check1 === true && flashcard.check2 === true && flashcard.check3 === true
     }
      setFl(flashcards.filter(checkIfCheckValue))
    }

  return (
    <Layout title="Completed Words | Flashcard">
      <h1>All words you memorized</h1>
           {fl.length === 0 ?
        <div>
          There is no cards.
             <br />
        <Link href='/flashcards/add'>
          <a>Add new flashcard!</a>
          </Link>  
        </div>
        :
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
    props: { flashcards, token},
  };
}
