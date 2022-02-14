import { useContext } from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import AuthContext from "@/context/AuthContext";
import styles from "@/styles/Header.module.css";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

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
          {user ? (
            // If logged in
            <>
              <li>
                <Link href="/flashcards/add">
                  <a>Add flashcard</a>
                </Link>
              </li>
              <li>
                <Link href="/account/dashbord">
                  <a>Dashbord</a>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => logout()}
                  className="btn-secondary btn-icon"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/account/login">
                  <a className="btn-secondary">
                    <FaSignInAlt /> Login
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
