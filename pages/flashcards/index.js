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
      <h1>Flashcards</h1>
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
    props: { flashcards, token },
  };
}
