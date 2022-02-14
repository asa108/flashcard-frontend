import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPencilAlt, FaTrashAlt, FaRegCheckSquare } from "react-icons/fa";

import { API_URL } from "../config/index";
import styles from "@/styles/Flascard.module.css";


export default function Flashcard({ flashcard }) {
  const router = useRouter()
  const [flip, setFlip] = useState(false);
  const handleFlip = () => {
    setFlip(!flip);
  };

  const handleDelete = async (e) => {
    // if (confirm("Are you sure?")) {
    const res = await fetch(`${API_URL}/flashcards/${flashcard.id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error("error");
    } else {
      router.push("/");
    }
  // }
  };

  return (
    <div>
      <div
        className={`${styles.card} ${flip ? `${styles.flip}` : ""}`}
        onClick={handleFlip}
      >
        <div className={styles.front}>{flashcard.term}</div>
        <div className={styles.back}>{flashcard.definition}</div>
      </div>
    <ToastContainer />
      <div className={styles.icons}>
        <FaRegCheckSquare />
        <FaRegCheckSquare />
        <FaRegCheckSquare />

        <Link href={`/edit/${flashcard.id}`}>
          <a className={styles.edit}>
            <FaPencilAlt />
          </a>
        </Link>
        <a
          href="#"
          className={styles.delete}
          onClick={() => handleDelete(flashcard.id)}
        >
          <FaTrashAlt />
        </a>
      </div>
    </div>
  );
}

// import { useState } from "react";
// import styles from "@/styles/Flascard.module.css";
// import Link from "next/link";
// import { FaPencilAlt, FaTrashAlt, FaRegCheckSquare } from "react-icons/fa";
// import "react-toastify/dist/ReactToastify.css";
// import { useRouter } from "next/router";
// import { API_URL } from "@/config/index";

// export default function Flashcard({ flashcard }) {
//   const router = useRouter();
//   const [flip, setFlip] = useState(false);
//   const handleFlip = () => {
//     setFlip(!flip);
//   };

//   const handleDelete = async (e) => {
//     // if (confirm("Are you sure?")) {
//     const res = await fetch(`${API_URL}/flashcards/${flashcard.id}`, {
//       method: "DELETE",
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       console.log("error");
//     } else {
//       router.push("/");
//     }
//     // }
//   };

//   return (
//     <div>
//       <div
//         className={`${styles.card} ${flip ? `${styles.flip}` : ""}`}
//         onClick={handleFlip}
//       >
//         <div className={styles.front}>{flashcard.english}</div>
//         <div className={styles.back}>{flashcard.japanese}</div>
//       </div>
//       <div className={styles.icons}>
//         <FaRegCheckSquare />
//         <FaRegCheckSquare />
//         <FaRegCheckSquare />

//         <Link href={`/edit/${flashcard.id}`}>
//           <a className={styles.edit}>
//             <FaPencilAlt />
//           </a>
//         </Link>
//         <a
//           href="#"
//           className={styles.delete}
//           onClick={() => handleDelete(flashcard.id)}
//         >
//           <FaTrashAlt />
//         </a>
//       </div>
//     </div>
//   );
// }
