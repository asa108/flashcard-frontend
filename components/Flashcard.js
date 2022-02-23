import { useState, useEffect, useContext } from "react"; // useContextを追加.
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPencilAlt, FaTrashAlt, FaRegCheckSquare } from "react-icons/fa";

import { API_URL } from "../config/index";
import styles from "@/styles/Flascard.module.css";

import { FlashcardContext } from './FlashcardList' //追加

export default function Flashcard({ flashcard, token }) {

  // const router = useRouter();
  const [flip, setFlip] = useState(false)

  // 親コンポーネントで作ったチェック.
  const [ [check1, setCheck1],
          [check2, setCheck2],
    [check3, setCheck3]] = useContext(FlashcardContext)
  console.log('check1',check1)
    
  //チェック1、2、3にuseStateを適応した.  
  // const [check1, setCheck1] = useState(flashcard.check1)
  // const [check2, setCheck2] = useState(flashcard.check2)
  // const [check3, setCheck3] = useState(flashcard.check3)
  
  // 使用してはいないが、useEffect追加.
  useEffect(() => {
      // do something.
  }, [check1, check2, check3]) 

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

  const handleCheck = async (check1, check2, check3) => {
    // console.log(flashcard.id, check1, check2, check3);
    const values = {
      term: flashcard.term,
      definition: flashcard.definition,
      check1: check1,
      check2: check2,
      check3: check3,
    };
    console.log('id',flashcard.id)
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
      // router.push("/account/dashboard");
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
          className={
            styles.checkicon + ' ' + (check1 ? styles.done : '')}
          onClick={() => {
            setCheck1((preState)=>{
              flashcard.check1 = !preState
              handleCheck(!preState, check2, check3)
              return !preState
            })
	      }}
        />
        <FaRegCheckSquare
          className={ styles.checkicon + ' ' + (check2 ? styles.done : '') }
          onClick={() => {
            setCheck2((preState)=>{
              flashcard.check2 = !preState
              handleCheck(check1, !preState, check3)
              return !preState
            })
	       }}
        />
        <FaRegCheckSquare
          className={ styles.checkicon + ' ' + (check3 ? styles.done : '') }
          onClick={() => {
            setCheck3((preState)=>{
              flashcard.check3 = !preState
              handleCheck(check1, check2, !preState)
              return !preState
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

