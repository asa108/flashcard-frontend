import Link from "next/link";
import styles from "@/styles/SideBar.module.css";

export default function SideBar() {
  return (
    <div className={styles.sidebar}>
      <nav>
        <ul>
          <li>
            <Link href="/flashcards">
              <a>Flashcard</a>
            </Link>
          </li>
          <li>
            <Link href="/flashcards/add">
              <a>Add new flashcard</a>
            </Link>
          </li>
          <li>
            <Link href="/account/dashboard">
              <a>All words</a>
            </Link>
          </li>
          <li>
            <Link href="/complete">
              <a>Completed words</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
