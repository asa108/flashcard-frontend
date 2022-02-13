import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import FlashcardList from "@/components/FlashcardList";

export default function HomePage({ flashcards }) {
  console.log(flashcards);
  return (
    <Layout title="Home Page | Flashcard">
      <h1>Flascard &gt; index</h1>
      {flashcards.length === 0 && <h3>No Words</h3>}
      <FlashcardList flashcards={flashcards} />
    </Layout>
  );
}

// get running everytime you come to the page
export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/flashcards`);
  const flashcards = await res.json();

  return {
    props: { flashcards },
    revalidate: 1,
  };
}
