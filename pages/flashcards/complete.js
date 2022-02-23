import { useEffect,useState } from 'react'
import { parseCookies } from "@/helpers/index";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import FlashcardList from "@/components/FlashcardList";

export default function CompletePage({ flashcards,token }) {
  const [fl, setFl] = useState(flashcards)
    console.log('fl-complete',fl)

  useEffect(() => {
    checkIfAuth()
  }, [])
 
  const checkIfAuth = () => {
    const checkIfCheckValue = (flashcard) => {
      console.log('c- flashcard',flashcard)
      return flashcard.check1 !== false && flashcard.check2 !== false && flashcard.check3 !== false
     }
    flashcards.filter(checkIfCheckValue)
    setFl(fl)
}
 
  return (
    <Layout title="Completed Words | Flashcard">
      <h1>All words you memorized</h1>
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
