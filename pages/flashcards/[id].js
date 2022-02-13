import { useRouter } from "next/router";
import Layout from "@/components/Layout";

export default function EventPage() {
  const router = useRouter();

  return (
    <Layout>
      <h1>Event Page 1</h1>
    </Layout>
  );
}

// import Layout from "@/components/Layout";
// import { API_URL } from "@/config/index";

// export default function Word({ fl }) {
//   return (
//     <Layout>
//       <h1>{fl.term}</h1>
//     </Layout>
//   );
// }

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/api/flashcards`);
//   const flashcards = await res.json();

//   const paths = flashcards.map((fl) => {
//     params: {
//       id: fl.id;
//     }
//   });
//   return {
//     paths,
//   };
// }

// // 一つのflash cardが欲しい時に使う
// export async function getStaticProps({ params: { id } }) {
//   console.log(id);
//   const res = await fetch(`${API_URL}/api/flashcards/${id}`);
//   const flashcards = await res.json();
//   return {
//     props: {
//       fl: flashcards[0],
//     },
//     revalidate: 1,
//   };
// }
