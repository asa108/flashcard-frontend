import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPencilAlt, FaTrashAlt, FaRegCheckSquare } from "react-icons/fa";

import { API_URL } from "../config/index";
import styles from "@/styles/Flascard.module.css";
import { parseCookies } from "@/helpers/index";

export default function Flashcard({ flashcard, token }) {
  // console.log(flashcard);
  const router = useRouter();
  const [flip, setFlip] = useState(false);
  const [check, setCheck] = useState(flashcard.check1);
  console.log("check1", flashcard.check1);
  console.log("check", check);

  // useEffect(() => {
  //   handleCheck();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleFlip = () => {
    setFlip(!flip);
  };

  const handleDelete = async (id) => {
    // if (confirm("Are you sure?")) {
    const res = await fetch(`${API_URL}/flashcards/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error("error");
    } else {
      router.push("/account/dashboard");
    }
    // }
  };

  const handleCheck = async (id) => {
    console.log("check", check);
    setCheck(!check);
    const values = {
      term: flashcard.term,
      definition: flashcard.definition,
      check1: check,
      check2: false,
      check3: false,
    };

    const res = await fetch(`${API_URL}/flashcards/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    console.log("res", res);
    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error("Unauthorized");
        return;
      }
      toast.error("Something went wrong");
    } else {
      const flashcard = await res.json();
      console.log("flashcard", flashcard);
      router.push("/account/dashboard");
    }
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
        <FaRegCheckSquare
          className={`${styles.checkicon} ${check ? `${styles.done}` : ""}`}
        />
        <FaRegCheckSquare className={styles.checkicon} />
        <FaRegCheckSquare className={styles.checkicon} />

        <Link href={`/flashcards/edit/${flashcard.id}`}>
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

// export async function getServerSideProps({ params: id }, req) {
//   const { token } = parseCookies(req)

//   const res = await fetch(`&{API_URL}/flashcards/${id}`)
//   const flashcard = await res.json()

//   console.log(flashcard,token)

//   return {
//     props: {
//       token,flashcard
//     }
//   }
// }

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaPencilAlt, FaTrashAlt, FaRegCheckSquare } from "react-icons/fa";

// import { API_URL } from "../config/index";
// import styles from "@/styles/Flascard.module.css";

// export default function Flashcard({ flashcard, token }) {
//   const router = useRouter();
//   const [flip, setFlip] = useState(false);
//   const handleFlip = () => {
//     setFlip(!flip);
//   };

//   const handleDelete = async (id) => {
//     // if (confirm("Are you sure?")) {
//     const res = await fetch(`${API_URL}/flashcards/${id}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       toast.error("error");
//     } else {
//       router.push("/account/dashboard");
//     }
//     // }
//   };

//   const checkIfDone = () => {

//   }

//   return (
//     <div>
//       <div
//         className={`${styles.card} ${flip ? `${styles.flip}` : ""}`}
//         onClick={handleFlip}
//       >
//         <div className={styles.front}>{flashcard.term}</div>
//         <div className={styles.back}>{flashcard.definition}</div>
//       </div>
//       <ToastContainer />
//       <div className={styles.icons}>
//         <FaRegCheckSquare onClick={checkIfDone} className={styles.checkicon} />
//         <FaRegCheckSquare className={styles.checkicon} />
//         <FaRegCheckSquare className={styles.checkicon} />

//         <Link href={`/flashcards/edit/${flashcard.id}`}>
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
