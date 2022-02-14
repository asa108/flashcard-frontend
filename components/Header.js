import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import styles from "@/styles/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>Flashcard</a>
        </Link>
      </div>

      <nav>
        <ul>
          <li>
            <Link href="/flashcards">
              <a>Flashcard</a>
            </Link>
          </li>
          <li>
            <Link href="/flashcards/add">
              <a>Add flashcard</a>
            </Link>
          </li>
          <li>
            <Link href="/account/login">
              <a className="btn-secondary">
                <FaSignInAlt /> Login
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
