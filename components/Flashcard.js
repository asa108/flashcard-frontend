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
  console.log(flashcard);
  const router = useRouter();
  const [flip, setFlip] = useState(false)
  
  //チェック1、2、3にuseStateを適応した.
  var [check1, setCheck1] = useState(flashcard.check1)
  var [check2, setCheck2] = useState(flashcard.check2)
  var [check3, setCheck3] = useState(flashcard.check3)

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

  const handleCheck = async (check1,check2,check3) => {
    console.log(flashcard.id, check1, check2, check3);
    const values = {
      term: flashcard.term,
      definition: flashcard.definition,
      check1: check1,
      check2: check2,
      check3: check3,
    };
    const res = await fetch(`${API_URL}/flashcards/${flashcard.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    // console.log("res", res);
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
          className={ styles.checkicon + ' ' + (check1 ? styles.done : '') }
          onClick={() => {                      //クリックイベント
                  setCheck1((preState)=>{       //チェック1の更新処理開始
                      check1 = !preState        //チェック1の状態を反転
                      handleCheck(!preState, check2, check3) //APIサーバーに送信
                      return !preState             //チェック1の状態更新完了
                  })
	       }}
        />
        <FaRegCheckSquare
          className={ styles.checkicon + ' ' + (check2 ? styles.done : '') }
          onClick={() => {
                  setCheck2((preState)=>{
                      check2 = !preState
                      handleCheck(check1,!preState,check3)
                      return !preState
                  })
	       }}
        />
        <FaRegCheckSquare
          className={ styles.checkicon + ' ' + (check3 ? styles.done : '') }
          onClick={() => {
                  setCheck3((preState)=>{
                      check3 = !preState
                      handleCheck(check1,check2,!preState)
                      return!preState
                  })
	       }}
        />

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
