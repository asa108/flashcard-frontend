import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";

export default function EditPage({ fl }) {
  const [values, setValues] = useState({
    term: fl.term,
    definition: fl.definition,
    check1: fl.check1,
    check2: fl.check2,
    check3: fl.check3,
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    if (hasEmptyFields) {
      toast.error("Please fill in all fields");
    }

    const res = await fetch(`${API_URL}/flashcards/${fl.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      toast.error("Something went wrong");
    } else {
      const fl = await res.json();
      router.push("/flashcards");
    }
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
      <h1>Edit Flashcard</h1>
      <ToastContainer />
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

        <input
          type="submit"
          value="Update Flashcard"
          className={styles.button}
        />
      </form>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${API_URL}/flashcards/${id}`);
  const fl = await res.json();

  return {
    props: {
      fl,
    },
  };
}
