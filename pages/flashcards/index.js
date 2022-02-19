// import Layout from "@/components/Layout";
// import { API_URL } from "@/config/index";
// import FlashcardList from "@/components/FlashcardList";

// export default function HomePage({ flashcards }) {
//   return (
//     <Layout title="Home Page | Flashcard">
//       <h1>Words</h1>
//       {flashcards.length === 0 && <h3>No Words</h3>}
//       <FlashcardList flashcards={flashcards} />
//     </Layout>
//   );
// }

// // get running everytime you come to the page
// export async function getStaticProps() {
//   const res = await fetch(`${API_URL}/flashcards`);
//   // const res = await fetch(`${API_URL}/flashcards?_sort=date:ASC&_limit=3`);
//   const flashcards = await res.json();

//   return {
//     props: { flashcards },
//     // props: { flashcards.slice(0,3) },
//     revalidate: 1,
//   };
// }

import { useEffect,useState } from 'react'
import Link from "next/link";
import { parseCookies } from "@/helpers/index";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import FlashcardList from "@/components/FlashcardList";

export default function HomePage({ flashcards }) {
  console.log('flashcards',flashcards)
  const [fl, setFl] = useState(flashcards)
   console.log('fl outside',fl)
  const [auth,setAuth] = useState(false)

  useEffect(() => {
    checkIfAuth()
  }, [])

  // let fl;
 
  const checkIfAuth = () => {
  if (flashcards.statusCode === 401 || flashcards.statusCode === 403) {
    console.log('This is not authorized')
    setAuth(true)
  } else {
    console.log('Authorizaed')
    setAuth(false)
    const checkIfFlase = (flashcard) => {
      return flashcard.check1 === false || flashcard.check2 === false || flashcard.check3 === false
     }
    
    fl = flashcards.filter(checkIfFlase)
    setFl(fl)
      console.log('fl inside', fl)
    
    // let flash = flashcards.filter(checkIfFlase)
    // console.log('flash inside', flash)

    // fl.push.apply(flash)
    // let hh = fl.concat(flash)
    // console.log('h',hh)
  } 
}
 
  return (
    <Layout title="Home Page | Flashcard">
      {auth ? <h1>Landing Page</h1> :
        <div>
            {flashcards.length === 0 && (
        <div>
      <h3>No Flashcards</h3>
        <Link href='/flashcards/add'>
          <a>Add new flashcard</a>
        </Link>
        </div>
          )}
     <FlashcardList flashcards={fl} />
     {/* <FlashcardList flashcards={fl} /> */}    
        </div>
      
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
