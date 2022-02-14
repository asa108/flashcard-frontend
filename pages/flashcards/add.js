import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";

export default function AddFlashcardPage() {
  const [values, setValues] = useState({
    term: "",
    definition: "",
    check1: false,
    check2: false,
    check3: false,
  });

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  return (
    <Layout title="Add flashcard">
      <Link href="/flashcards">
        <a>Go Back</a>
      </Link>
      <h1>Add Flashcard</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="terms">Term</label>
            <input
              type="text"
              id="term"
              name="term"
              value={values.term}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="definition">Definition</label>
            <input
              type="text"
              id="definition"
              name="definition"
              value={values.definition}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <input type="submit" value="Add Flashcard" className={styles.button} />
      </form>
    </Layout>
  );
}
