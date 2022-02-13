import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

export default function HomePage({ flashcards }) {
  return (
    <Layout title="Home Page | Flashcard">
      <h1>Words</h1>
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
