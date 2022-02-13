import Link from "next/link";
import styles from "@/styles/FlashcardList.module.css";
import Flashcard from "./Flashcard";

export default function FlashcardList({ flashcards }) {
  return (
    <div className={styles.container}>
      {flashcards.map((flashcard) => {
        return <Flashcard key={flashcard.id} flashcard={flashcard} />;
      })}
      <p>{flashcards.terms}</p>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import Flashcard from "./Flashcard";
// import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
// import styles from "@/styles/FlashcardList.module.css";

// export default function FlashcardList({ flashcards }) {
//   const [idx, setIdx] = useState(0);
//   const [leftDisable, setLeftDisable] = useState(false);
//   const [rightDisable, setRightDisable] = useState(false);

//   const totalWords = flashcards.length;
//   let fl = flashcards[idx];

//   useEffect(() => {
//     checkIndex();
//   });

//   const next = () => {
//     if (idx + 1 === totalWords) {
//       setDisable(true);
//     } else {
//       setIdx(idx + 1);
//     }
//   };

//   const back = () => {
//     if (idx === 0) {
//       setDisable(true);
//     } else {
//       setIdx(idx - 1);
//     }
//   };

//   const checkIndex = () => {
//     if (idx === 0) {
//       setLeftDisable(true);
//       setRightDisable(false);
//     } else if (idx + 1 === totalWords) {
//       setRightDisable(true);
//       setLeftDisable(false);
//     } else {
//       setRightDisable(false);
//       setLeftDisable(false);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <Flashcard flashcard={fl} />
//       <div className={styles.icons}>
//         <FaChevronLeft
//           className={`${styles.arrow} ${
//             leftDisable ? `${styles.disable}` : ""
//           }`}
//           onClick={back}
//         />
//         <span>
//           {idx + 1} / {totalWords}
//         </span>
//         <FaChevronRight
//           className={`${styles.arrow} ${
//             rightDisable ? `${styles.disable}` : ""
//           }`}
//           onClick={next}
//         />
//       </div>
//     </div>
//   );
// }
