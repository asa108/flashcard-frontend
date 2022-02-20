import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { parseCookies } from "@/helpers/index";

import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";

export default function AddFlashcardPage({ token }) {
  console.log('token',token)
  const [values, setValues] = useState({
    term: "",
    definition: "",
    check1: false,
    check2: false,
    check3: false,
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

    const res = await fetch(`${API_URL}/flashcards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error("No token included");
        return;
      }
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
      <h1>Add Flashcard</h1>

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
        <input type="submit" value="Add Flashcard" className={styles.button} />
      </form>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  console.log('token',token)

  // redirect login pege when user not logged in
  if (token === undefined) {
    return {
      redirect: {
        destination: '/account/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      token:token || null,
    },
  };
}