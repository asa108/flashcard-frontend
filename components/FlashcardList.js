import React, { useState, useEffect } from "react"; //Reactを追加.
import Link from "next/link";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import styles from "@/styles/FlashcardList.module.css";
import Flashcard from "./Flashcard";

export const FlashcardContext = React.createContext() // フラッシュカードのコンテキスト.

export default function FlashcardList({ flashcards, token }) {

  const [idx, setIdx] = useState(0);
  const [leftDisable, setLeftDisable] = useState(false);
  const [rightDisable, setRightDisable] = useState(false);
  const [disable, setDisable] = useState(false);

  // 親コンポーネント側でチェックを作る.
  const [check1, setCheck1] = useState(false)
  const [check2, setCheck2] = useState(false)
  const [check3, setCheck3] = useState(false)
  const checks = [ [check1, setCheck1], [check2, setCheck2], [check3, setCheck3] ]

  const totalFlashcards = flashcards.length;
  let fl = flashcards[idx];

  useEffect(() => {
    
    // 状態を再セットする.
    setCheck1(fl.check1)
    setCheck2(fl.check2)
    setCheck3(fl.check3)

    checkIndex();
  });

  const next = () => {
    if (idx + 1 === totalFlashcards) {
      setDisable(true);
    } else {
      setIdx(idx + 1);
    }
  };

  const back = () => {
    if (idx === 0) {
      setDisable(true);
    } else {
      setIdx(idx - 1);
    }
  };

  const checkIndex = () => {
    if (idx === 0) {
      setLeftDisable(true);
      setRightDisable(false);
    } else if (idx + 1 === totalFlashcards) {
      setRightDisable(true);
      setLeftDisable(false);
    } else {
      setRightDisable(false);
      setLeftDisable(false);
    }
  };
  return (
    <div className={styles.container}>
      
         {/* valueは親子で共有させるデータ */}
      <FlashcardContext.Provider value={checks}>
        <Flashcard flashcard={fl} token={token}/>
      </FlashcardContext.Provider>
      
      <div className={styles.icons}>
        <FaChevronLeft
          className={`${styles.arrow} ${
            leftDisable ? `${styles.disable}` : ""
          }`}
          onClick={back}
        />
        <span>
          {idx + 1} / {totalFlashcards}
        </span>
        <FaChevronRight
          className={`${styles.arrow} ${
            rightDisable ? `${styles.disable}` : ""
          }`}
          onClick={next}
        />
      </div>
    </div>
  );
}


 